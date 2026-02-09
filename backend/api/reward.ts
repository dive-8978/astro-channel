import express from "express";
import { getUser, assignReward } from "../lib/db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const wallet = req.query.wallet as string;
    if (!wallet) return res.status(400).json({ error: "Missing wallet" });

    const reward = await assignReward(wallet);
    const user = await getUser(wallet);

    res.json({
      success: true,
      reward,
      verified: {
        imei: user?.verified_imei || false,
        x: user?.verified_x || false,
        bridge: user?.verified_bridge || false
      },
      claimed: user?.claimed || false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
