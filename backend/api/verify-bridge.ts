import type { Request, Response } from "express";
import { createUserIfNotExist, markTask, assignReward } from "../lib/db";

export default async function handler(req: Request, res: Response) {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });

    createUserIfNotExist(wallet);
    markTask(wallet, "bridge");

    const reward = assignReward(wallet);

    res.json({ success: true, reward });
  } catch (err: any) {
    console.error("verify-bridge error:", err);
    res.status(500).json({ error: err.toString() });
  }
}
