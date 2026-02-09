import type { Request, Response } from "express";
import { createUserIfNotExist, markTask, assignReward, db } from "../lib/db";

export default async function handler(req: Request, res: Response) {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });

    // 1️⃣ 创建用户记录（如果不存在）
    createUserIfNotExist(wallet);

    // 2️⃣ 检查是否已完成 X 任务
    const user = db.prepare("SELECT verified_x FROM users WHERE wallet = ?").get(wallet);
    if (user.verified_x) return res.status(400).json({ error: "X task already verified" });

    // 3️⃣ 标记任务完成
    markTask(wallet, "x");

    // 4️⃣ 分配奖励
    const reward = assignReward(wallet);

    res.json({ success: true, reward });

  } catch (err: any) {
    console.error("verify-x error:", err);
    res.status(500).json({ error: err.toString() });
  }
}
