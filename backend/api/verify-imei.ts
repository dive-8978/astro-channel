import express from "express";
import { createUserIfNotExist, isImeiUsed, markImeiUsed, markTask, assignReward } from "../lib/db";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { wallet, imei } = req.body;
    if (!wallet || !imei || imei.length !== 15) return res.status(400).json({ error: "Invalid params" });

    const used = await isImeiUsed(imei);
    if (used) return res.status(400).json({ error: "IMEI already used" });

    await createUserIfNotExist(wallet);
    await markTask(wallet, "imei");
    await markImeiUsed(imei, wallet);
    const reward = await assignReward(wallet);

    res.json({ success: true, reward });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
