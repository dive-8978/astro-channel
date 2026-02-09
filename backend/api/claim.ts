import type { Request, Response } from "express";
import { signClaim } from "../lib/signature";

export default async function handler(req: Request, res: Response) {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });

    const result = await signClaim(wallet);

    res.json({ success: true, ...result });
  } catch (err: any) {
    console.error("claim error:", err);
    res.status(500).json({ error: err.toString() });
  }
}
