import express from 'express';
import { pool } from '../lib/db';
const router = express.Router();

/**
 * POST /api/verify-x
 * body: { wallet: string }
 */
router.post('/', async (req, res) => {
  try {
    const { wallet } = req.body;

    // 校验 wallet 格式
    if (!wallet || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return res.status(400).json({ success: false, message: 'Invalid wallet address' });
    }

    // 查询用户
    const userResult = await pool.query(
      'SELECT x_verified FROM airdrop WHERE wallet = $1',
      [wallet]
    );

    if (userResult.rows[0]?.x_verified) {
      return res.json({ success: true, message: 'X already verified' });
    }

    // TODO: 对接 X API 验证关注状态
    const isFollowed = true; // 这里先假设验证成功
    if (!isFollowed) {
      return res.status(400).json({ success: false, message: 'Not following @Astro___Channel' });
    }

    // 插入或更新记录
    await pool.query(
      `INSERT INTO airdrop (wallet, x_verified)
       VALUES ($1, true)
       ON CONFLICT (wallet) DO UPDATE SET x_verified = true`,
      [wallet]
    );

    return res.json({ success: true, message: 'X verified ✅' });
  } catch (err) {
    console.error('verify-x error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
