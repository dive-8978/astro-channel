import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 初始化表
export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      wallet TEXT PRIMARY KEY,
      reward INTEGER DEFAULT 0,
      claimed BOOLEAN DEFAULT FALSE,
      verified_imei BOOLEAN DEFAULT FALSE,
      verified_x BOOLEAN DEFAULT FALSE,
      verified_bridge BOOLEAN DEFAULT FALSE,
      created_at BIGINT DEFAULT EXTRACT(EPOCH FROM NOW())
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS imeis (
      imei TEXT PRIMARY KEY,
      wallet TEXT,
      created_at BIGINT DEFAULT EXTRACT(EPOCH FROM NOW())
    );
  `);
}

export async function createUserIfNotExist(wallet: string) {
  await pool.query(
    `INSERT INTO users(wallet) VALUES($1) ON CONFLICT (wallet) DO NOTHING`,
    [wallet]
  );
}

export async function getUser(wallet: string) {
  const res = await pool.query(`SELECT * FROM users WHERE wallet = $1`, [wallet]);
  return res.rows[0];
}

export async function markTask(wallet: string, task: "imei" | "x" | "bridge") {
  const col = task === "imei" ? "verified_imei" : task === "x" ? "verified_x" : "verified_bridge";
  await pool.query(`UPDATE users SET ${col} = TRUE WHERE wallet = $1`, [wallet]);
}

export async function isImeiUsed(imei: string) {
  const res = await pool.query(`SELECT 1 FROM imeis WHERE imei = $1`, [imei]);
  return res.rowCount > 0;
}

export async function markImeiUsed(imei: string, wallet: string) {
  await pool.query(`INSERT INTO imeis(imei, wallet) VALUES($1, $2)`, [imei, wallet]);
}

// 奖励阶梯
const rewardTiers = [
  { maxRank: 10000, reward: 525000 },
  { maxRank: 50000, reward: 218750 },
  { maxRank: 100000, reward: 140000 },
  { maxRank: 200000, reward: 70000 },
  { maxRank: 1000000, reward: 8750 },
];

export async function assignReward(wallet: string) {
  const user = await getUser(wallet);
  if (!user) return 0;
  if (user.reward > 0) return user.reward;

  const res = await pool.query(
    `SELECT COUNT(*) as cnt FROM users WHERE created_at <= $1`,
    [user.created_at]
  );
  const rank = Number(res.rows[0].cnt);

  let reward = 0;
  for (const tier of rewardTiers) {
    if (rank <= tier.maxRank) {
      reward = tier.reward;
      break;
    }
  }

  await pool.query(`UPDATE users SET reward = $1 WHERE wallet = $2`, [reward, wallet]);
  return reward;
}

export { pool };
