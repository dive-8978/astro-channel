import express from "express";
import { getUser, pool } from "../lib/db";
import { signAirdrop } from "../lib/signature";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });

    const user = await getUser(wallet);
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.claimed) return res.status(400).json({ error: "Already claimed" });

    // 计算锁仓时间，3 个月后
    const lockUntil = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 3;

    const signature = signAirdrop(wallet, user.reward, lockUntil);

    // 标记已领取
    await pool.query(`UPDATE users SET claimed = TRUE WHERE wallet = $1`, [wallet]);

    res.json({
      success: true,
      reward: user.reward,
      lockUntil,
      signature
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
