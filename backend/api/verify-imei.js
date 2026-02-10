const express = require("express");
const { createUserIfNotExist, isImeiUsed, markImeiUsed, markTask, assignReward } = require("../lib/db");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { wallet, imei } = req.body;
    if (!wallet || !imei || imei.length !== 15) return res.status(400).json({ error: "Invalid params" });

    const used = isImeiUsed(imei);
    if (used) return res.status(400).json({ error: "IMEI already used" });

    createUserIfNotExist(wallet);
    markTask(wallet, "imei");
    markImeiUsed(wallet, imei);
    const reward = assignReward(wallet, 100);

    res.json({ success: true, reward });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;