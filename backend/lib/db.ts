import Database from "better-sqlite3";

export const db = new Database("airdrop.db");

/**
 * ===============================
 * 初始化表结构
 * ===============================
 */
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  wallet TEXT PRIMARY KEY,
  verified_imei INTEGER DEFAULT 0,
  verified_x INTEGER DEFAULT 0,
  verified_bridge INTEGER DEFAULT 0,
  reward INTEGER DEFAULT 0,
  claimed INTEGER DEFAULT 0,
  created_at INTEGER
);

CREATE TABLE IF NOT EXISTS imei_used (
  imei TEXT PRIMARY KEY,
  wallet TEXT,
  created_at INTEGER
);
`);

/**
 * ===============================
 * 用户相关
 * ===============================
 */
export function getUser(wallet: string) {
  return db.prepare(
    "SELECT * FROM users WHERE wallet = ?"
  ).get(wallet);
}

export function createUserIfNotExist(wallet: string) {
  db.prepare(`
    INSERT OR IGNORE INTO users (wallet, created_at)
    VALUES (?, ?)
  `).run(wallet, Date.now());
}

/**
 * ===============================
 * 任务标记
 * ===============================
 */
export function markTask(
  wallet: string,
  task: "imei" | "x" | "bridge"
) {
  const field =
    task === "imei" ? "verified_imei" :
    task === "x" ? "verified_x" :
    "verified_bridge";

  db.prepare(`
    UPDATE users SET ${field} = 1 WHERE wallet = ?
  `).run(wallet);
}

/**
 * ===============================
 * IMEI 防重复
 * ===============================
 */
export function isImeiUsed(imei: string) {
  return !!db.prepare(
    "SELECT 1 FROM imei_used WHERE imei = ?"
  ).get(imei);
}

export function markImeiUsed(imei: string, wallet: string) {
  db.prepare(`
    INSERT INTO imei_used (imei, wallet, created_at)
    VALUES (?, ?, ?)
  `).run(imei, wallet, Date.now());
}

/**
 * ===============================
 * 奖励阶梯（按顺序）
 * ===============================
 */
export function calculateReward(): number {
  const count =
    db.prepare("SELECT COUNT(*) AS c FROM users").get().c;

  if (count <= 10_000) return 20_000;
  if (count <= 50_000) return 15_000;
  if (count <= 100_000) return 5_000;
  if (count <= 200_000) return 1_000;
  if (count <= 1_000_000) return 500;

  return 0;
}

export function assignReward(wallet: string) {
  const reward = calculateReward();
  if (reward === 0) throw "Airdrop full";

  db.prepare(`
    UPDATE users SET reward = ? WHERE wallet = ?
  `).run(reward, wallet);

  return reward;
}

/**
 * ===============================
 * Claim 状态
 * ===============================
 */
export function markClaimed(wallet: string) {
  db.prepare(`
    UPDATE users SET claimed = 1 WHERE wallet = ?
  `).run(wallet);
}
