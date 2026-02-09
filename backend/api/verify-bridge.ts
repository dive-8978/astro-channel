import type { Request, Response } from "express";
import { createUserIfNotExist, markTask, assignReward, db } from "../lib/db";

/**
 * 模拟跨链桥验证
 * 如果有真实桥链记录，可以在这里接 API 查询
 */
async function checkBridgeTransfer(wallet: string): Promise<boolean> {
  // 模拟：假设用户总是完成
  // 如果接真实桥，可查询交易哈希或链上记录
  return true;
}

export default async function handler(req: Request, res: Response) {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });

    // 1️⃣ 创建用户记录（如果不存在）
    createUserIfNotExist(wallet);

    // 2️⃣ 检查是否已完成 bridge 任务
    const user = db.prepare("SELECT verified_bridge FROM users WHERE wallet = ?").get(wallet);
    if (user.verified_bridge) return res.status(400).json({ error: "Bridge task already verified" });

    // 3️⃣ 验证桥交易
    const completed = await checkBridgeTransfer(wallet);
    if (!completed) return res.status(400).json({ error: "No valid bridge transfer found" });

    // 4️⃣ 标记任务完成
    markTask(wallet, "bridge");

    // 5️⃣ 分配奖励
    const reward = assignReward(wallet);

    res.json({ success: true, reward });

  } catch (err: any) {
    console.error("verify-bridge error:", err);
    res.status(500).json({ error: err.toString() });
  }
}
