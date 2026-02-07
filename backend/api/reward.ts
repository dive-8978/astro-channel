import express from 'express';
import { pool } from '../lib/db';
const router = express.Router();

/**
 * GET /api/reward?wallet=0x...
 * 返回用户总奖励（阶梯 + IMEI 奖励）
 */
router.get('/', async (req, res) => {
  try {
    const { wallet } = req.query;

    if (!wallet || typeof wallet !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return res.status(400).json({ success: false, message: 'Invalid wallet address' });
    }

    // 查询用户信息
    const userResult = await pool.query(
      'SELECT rank, imei_verified FROM airdrop WHERE wallet = $1',
      [wallet]
    );

    if (!userResult.rows.length) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const user = userResult.rows[0];
    const rank = user.rank;

    // 阶梯奖励
    let baseReward = 0;
    if (rank <= 10000) baseReward = 525000;
    else if (rank <= 50000) baseReward = 218750;
    else if (rank <= 100000) baseReward = 140000;
    else if (rank <= 200000) baseReward = 70000;
    else if (rank <= 1000000) baseReward = 8750;
    else return res.status(400).json({ success: false, message: 'Rank beyond 1M limit' });

    const imeiBonus = user.imei_verified ? 10000 : 0;
    const totalReward = baseReward + imeiBonus;

    return res.json({
      success: true,
      baseReward,
      imeiBonus,
      totalReward
    });
  } catch (err) {
    console.error('reward error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
