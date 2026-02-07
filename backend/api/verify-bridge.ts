import express from 'express';
import { pool } from '../lib/db';
const router = express.Router();

/**
 * POST /api/verify-bridge
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
      'SELECT bridge_verified FROM airdrop WHERE wallet = $1',
      [wallet]
    );

    if (userResult.rows[0]?.bridge_verified) {
      return res.json({ success: true, message: 'Bridge already verified' });
    }

    // TODO: 对接跨链桥 API 验证转账
    const hasTransfer = true; // 这里先假设验证成功
    if (!hasTransfer) {
      return res.status(400).json({ success: false, message: 'No valid bridge transfer found' });
    }

    // 插入或更新记录
    await pool.query(
      `INSERT INTO airdrop (wallet, bridge_verified)
       VALUES ($1, true)
       ON CONFLICT (wallet) DO UPDATE SET bridge_verified = true`,
      [wallet]
    );

    return res.json({ success: true, message: 'Bridge verified ✅' });
  } catch (err) {
    console.error('verify-bridge error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
