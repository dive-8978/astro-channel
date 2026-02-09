import Database from "better-sqlite3";
import path from "path";

// 数据库文件
const dbPath = path.join(__dirname, "airdrop.db");
export const db = new Database(dbPath);

// 初始化 users 表
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  wallet TEXT PRIMARY KEY,
  reward INTEGER DEFAULT 0,
  claimed INTEGER DEFAULT 0,
  verified_imei INTEGER DEFAULT 0,
  verified_x INTEGER DEFAULT 0,
  verified_bridge INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (strftime('%s','now'))
)
`).run();

// 初始化 imeis 表
db.prepare(`
CREATE TABLE IF NOT EXISTS imeis (
  imei TEXT PRIMARY KEY,
  wallet TEXT,
  created_at INTEGER DEFAULT (strftime('%s','now'))
)
`).run();

// ============================
// 用户操作
// ============================

// 创建用户，如果不存在
export function createUserIfNotExist(wallet: string) {
  db.prepare("INSERT OR IGNORE INTO users(wallet) VALUES(?)").run(wallet);
}

// 获取用户
export function getUser(wallet: string) {
  return db.prepare("SELECT * FROM users WHERE wallet = ?").get(wallet);
}

// 标记任务完成
export function markTask(wallet: string, task: "imei" | "x" | "bridge") {
  const col = task === "imei" ? "verified_imei" : task === "x" ? "verified_x" : "verified_bridge";
  db.prepare(`UPDATE users SET ${col} = 1 WHERE wallet = ?`).run(wallet);
}

// ============================
// IMEI 去重
// ============================
export function isImeiUsed(imei: string) {
  return !!db.prepare("SELECT 1 FROM imeis WHERE imei = ?").get(imei);
}

export function markImeiUsed(imei: string, wallet: string) {
  db.prepare("INSERT INTO imeis(imei, wallet) VALUES(?, ?)").run(imei, wallet);
}

// ============================
// 奖励阶梯逻辑
// ============================
const rewardTiers = [
  { maxRank: 10000, reward: 525000 },
  { maxRank: 50000, reward: 218750 },
  { maxRank: 100000, reward: 140000 },
  { maxRank: 200000, reward: 70000 },
  { maxRank: 1000000, reward: 8750 },
];

// 分配奖励
export function assignReward(wallet: string) {
  const user = getUser(wallet);
  if (!user) return 0;
  if (user.reward > 0) return user.reward;

  // 计算排名（按创建时间）
  const rank = db.prepare("SELECT COUNT(*) as cnt FROM users WHERE created_at <= ?").get(user.created_at).cnt;

  // 按阶梯奖励
  let reward = 0;
  for (const tier of rewardTiers) {
    if (rank <= tier.maxRank) {
      reward = tier.reward;
      break;
    }
  }

  db.prepare("UPDATE users SET reward = ? WHERE wallet = ?").run(reward, wallet);
  return reward;
}
