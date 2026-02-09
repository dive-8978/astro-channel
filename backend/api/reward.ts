import type { Request, Response } from "express";
import { getUser } from "../lib/db";

export default async function handler(req: Request, res: Response) {
  try {
    const { wallet } = req.query;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });

    const user = getUser(wallet as string);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ reward: user.reward, claimed: user.claimed });
  } catch (err: any) {
    console.error("reward error:", err);
    res.status(500).json({ error: err.toString() });
  }
}
