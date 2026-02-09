import type { Request, Response } from "express";
import { getUser, createUserIfNotExist } from "../lib/db";
import { signClaim } from "../lib/signature";

export default async function handler(req: Request, res: Response) {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });

    // 1️⃣ 创建用户记录（如果不存在）
    createUserIfNotExist(wallet);

    const user = getUser(wallet);
    if (!user) return res.status(400).json({ error: "User not found" });

    // 2️⃣ 检查是否完成任意任务
    if (!(user.verified_imei || user.verified_x || user.verified_bridge)) {
      return res.status(400).json({ error: "No verified task found" });
    }

    // 3️⃣ 检查是否已领取
    if (user.claimed) return res.status(400).json({ error: "Already claimed" });

    // 4️⃣ 生成签名
    const { signature, amount, lockUntil } = await signClaim(wallet);

    res.json({
      success: true,
      amount,
      lockUntil,
      signature
    });

  } catch (err: any) {
    console.error("claim error:", err);
    res.status(500).json({ error: err.toString() });
  }
}
