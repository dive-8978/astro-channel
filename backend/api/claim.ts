import express from 'express';
import { pool } from '../lib/db';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// 使用后端 signer
if (!process.env.SIGNER_PRIVATE_KEY) throw new Error('SIGNER_PRIVATE_KEY not set');
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY);
const CHAIN_ID = parseInt(process.env.CHAIN_ID || '1');

/**
 * POST /api/claim
 * body: { wallet: string, reward: number }
 */
router.post('/', async (req, res) => {
  try {
    const { wallet, reward } = req.body;

    // 校验
    if (!wallet || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return res.status(400).json({ success: false, message: 'Invalid wallet address' });
    }
    if (!reward || isNaN(reward) || reward <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid reward amount' });
    }

    // 查询用户是否已领取
    const userResult = await pool.query(
      'SELECT claimed FROM airdrop WHERE wallet = $1',
      [wallet]
    );

    if (!userResult.rows.length) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (userResult.rows[0].claimed) {
      return res.status(400).json({ success: false, message: 'Already claimed' });
    }

    // 生成签名
    const messageHash = ethers.utils.solidityKeccak256(
      ["string", "address", "uint256", "uint256"],
      ["Claim MemeAstro Airdrop", wallet, ethers.utils.parseUnits(reward.toString(), 18), CHAIN_ID]
    );
    const signature = await signer.signMessage(ethers.utils.arrayify(messageHash));

    // 更新数据库状态
    await pool.query(
      `UPDATE airdrop 
       SET claimed = true, reward = $1, claimed_at = NOW() 
       WHERE wallet = $2`,
      [reward, wallet]
    );

    return res.json({
      success: true,
      signature,
      unlockTime: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 3个月锁仓
    });
  } catch (err) {
    console.error('claim error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
