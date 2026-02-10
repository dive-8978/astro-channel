const Database = require('better-sqlite3');

const dbPath = './data/airdrop.db';
const db = new Database(dbPath);

// 开启外键约束与高性能模式
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

// 用户表
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_address TEXT UNIQUE NOT NULL,
    imei TEXT,
    x_followed INTEGER DEFAULT 0,
    bridge_done INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
`).run();

// 任务表
db.prepare(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    task_type TEXT NOT NULL,
    verified INTEGER DEFAULT 0,
    verified_at DATETIME,
    FOREIGN KEY(user_id) REFERENCES users(id))
`).run();

// 空投领取表
db.prepare(`
CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    claimed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    unlock_at DATETIME,
    FOREIGN KEY(user_id) REFERENCES users(id))
`).run();

// 给 API 使用的函数
function createUserIfNotExist(wallet) {
  const exists = db.prepare("SELECT id FROM users WHERE wallet_address = ?").get(wallet);
  if (!exists) {
    db.prepare("INSERT INTO users (wallet_address) VALUES (?)").run(wallet);
  }
}

function isImeiUsed(imei) {
  return !!db.prepare("SELECT id FROM users WHERE imei = ?").get(imei);
}

function markImeiUsed(wallet, imei) {
  db.prepare("UPDATE users SET imei = ? WHERE wallet_address = ?").run(imei, wallet);
}

function markTask(wallet, task) {
  const user = db.prepare("SELECT id FROM users WHERE wallet_address = ?").get(wallet);
  if (!user) return;
  db.prepare(`
    INSERT INTO tasks (user_id, task_type, verified, verified_at)
    VALUES (?, ?, 1, CURRENT_TIMESTAMP)
    ON CONFLICT DO UPDATE SET verified = 1, verified_at = CURRENT_TIMESTAMP
  `).run(Number(user.id), task);
}

function assignReward(wallet, amount) {
  const user = db.prepare("SELECT id FROM users WHERE wallet_address = ?").get(wallet);
  if (!user) return;
  db.prepare(`
    INSERT INTO claims (user_id, amount, unlock_at)
    VALUES (?, ?, datetime('now', '+7 days'))
  `).run(Number(user.id), amount);
  return amount;
}

module.exports = {
  db,
  createUserIfNotExist,
  isImeiUsed,
  markImeiUsed,
  markTask,
  assignReward
};