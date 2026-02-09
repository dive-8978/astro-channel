import type { Request, Response } from "express";
import { db, createUserIfNotExist, isImeiUsed, markImeiUsed, markTask, assignReward } from "../lib/db";

export default async function handler(req: Request, res: Response) {
  try {
    const { wallet, imei } = req.body;

    if (!wallet || !imei) return res.status(400).json({ error: "Missing wallet or IMEI" });
    if (!/^\d{15}$/.test(imei)) return res.status(400).json({ error: "IMEI must be 15 digits" });

    // 1️⃣ 创建用户记录（如果不存在）
    createUserIfNotExist(wallet);

    // 2️⃣ 检查 IMEI 是否已用
    if (isImeiUsed(imei)) return res.status(400).json({ error: "IMEI already used" });

    // 3️⃣ 标记任务完成
    markTask(wallet, "imei");

    // 4️⃣ 标记 IMEI
    markImeiUsed(imei, wallet);

    // 5️⃣ 分配奖励
    const reward = assignReward(wallet);

    res.json({ success: true, reward });

  } catch (err: any) {
    console.error("verify-imei error:", err);
    res.status(500).json({ error: err.toString() });
  }
}
