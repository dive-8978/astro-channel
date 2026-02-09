import express from "express";
import { createUserIfNotExist, markTask, assignReward } from "../lib/db";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });

    await createUserIfNotExist(wallet);
    await markTask(wallet, "bridge");
    const reward = await assignReward(wallet);

    res.json({ success: true, reward });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
