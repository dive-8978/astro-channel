import express from 'express';
import { pool } from '../lib/db';
const router = express.Router();

/**
 * POST /api/verify-imei
 * body: { imei: string, wallet: string }
 */
router.post('/', async (req, res) => {
  try {
    const { imei, wallet } = req.body;

    // 参数校验
    if (!imei || !/^\d{15}$/.test(imei)) {
      return res.status(400).json({ success: false, message: 'Invalid IMEI' });
    }
    if (!wallet || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return res.status(400).json({ success: false, message: 'Invalid wallet address' });
    }

    // 查询是否已使用
    const check = await pool.query(
      'SELECT * FROM airdrop WHERE imei = $1 OR wallet = $2',
      [imei, wallet]
    );

    if (check.rows.some(row => row.imei_verified)) {
      return res.status(400).json({ success: false, message: 'IMEI already used' });
    }

    // 插入或更新
    await pool.query(
      `INSERT INTO airdrop (wallet, imei, imei_verified)
       VALUES ($1, $2, true)
       ON CONFLICT (wallet) DO UPDATE SET imei = EXCLUDED.imei, imei_verified = true`,
      [wallet, imei]
    );

    return res.json({ success: true, message: 'IMEI verified (+10,000 MA)' });
  } catch (err) {
    console.error('verify-imei error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
