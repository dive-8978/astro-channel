import type { Request, Response } from "express";
import { createUserIfNotExist, isImeiUsed, markImeiUsed, markTask, assignReward } from "../lib/db";

export default async function handler(req: Request, res: Response) {
  try {
    const { wallet, imei } = req.body;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });
    if (!imei) return res.status(400).json({ error: "Missing IMEI" });

    const imeiTrim = imei.trim();
    if (imeiTrim.length !== 15 || !/^\d+$/.test(imeiTrim)) {
      return res.status(400).json({ error: "IMEI must be 15 digits" });
    }

    if (isImeiUsed(imeiTrim)) {
      return res.status(400).json({ error: "IMEI already used" });
    }

    createUserIfNotExist(wallet);
    markTask(wallet, "imei");
    markImeiUsed(imeiTrim, wallet);

    const reward = assignReward(wallet);

    res.json({ success: true, reward });
  } catch (err: any) {
    console.error("verify-imei error:", err);
    res.status(500).json({ error: err.toString() });
  }
}
