const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const db = require('./lib/db');
const verifyImei = require("./api/verify-imei");

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(cors());
app.use(bodyParser.json());

// 路由
app.use("/api/verify-imei", verifyImei);

// 健康检查
app.get("/", (req, res) => 
  res.send("MemeAstro backend running")
);

// ==============================
// 🔐 锁仓空投领取接口
// ==============================
app.post("/api/claim-airdrop", async (req, res) => {
  try {
    const { wallet } = req.body;

    if (!wallet) {
      return res.json({ success: false, msg: "Wallet required" });
    }

    const exists = await db.get(`
      SELECT * FROM airdrop WHERE wallet = ?
    `, [wallet]);

    if (exists) {
      return res.json({
        success: false,
        msg: "Already claimed | Locked 90 days"
      });
    }

    await db.run(`
      INSERT INTO airdrop (wallet, claim_time, withdrawn)
      VALUES (?, ?, ?)
    `, [wallet, Date.now(), 0]);

    return res.json({
      success: true,
      msg: "Claimed! Locked 90 days"
    });

  } catch (err) {
    console.error("claim error", err);
    return res.json({ success: false, msg: "Server error" });
  }
});

// ==============================
// 💰 90天后提取接口
// ==============================
app.post("/api/withdraw-airdrop", async (req, res) => {
  try {
    const { wallet } = req.body;

    const record = await db.get(`
      SELECT * FROM airdrop WHERE wallet = ?
    `, [wallet]);

    if (!record) {
      return res.json({ success: false, msg: "Not claimed yet" });
    }

    const now = Date.now();
    const claimTime = Number(record.claim_time);
    const lockedMs = 7776000000; // 90天

    if (now - claimTime < lockedMs) {
      return res.json({
        success: false,
        msg: "Still locked, wait 90 days"
      });
    }

    if (record.withdrawn === 1) {
      return res.json({
        success: false,
        msg: "Already withdrawn"
      });
    }

    await db.run(`
      UPDATE airdrop SET withdrawn = 1 WHERE wallet = ?
    `, [wallet]);

    return res.json({
      success: true,
      msg: "Withdrawn success!"
    });

  } catch (err) {
    console.error("withdraw error", err);
    return res.json({ success: false, msg: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});