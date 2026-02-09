import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 引入 API
import verifyImei from "./api/verify-imei";
import verifyX from "./api/verify-x";
import verifyBridge from "./api/verify-bridge";
import claim from "./api/claim";
import { getUser } from "./lib/db";

// 路由挂载
app.post("/api/verify-imei", verifyImei);
app.post("/api/verify-x", verifyX);
app.post("/api/verify-bridge", verifyBridge);
app.post("/api/claim", claim);

// 可选：获取用户奖励信息
app.get("/api/reward/:wallet", (req, res) => {
  try {
    const { wallet } = req.params;
    const user = getUser(wallet);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      success: true,
      wallet,
      reward: user.reward || 0,
      tasks: {
        imei: user.verified_imei || false,
        x: user.verified_x || false,
        bridge: user.verified_bridge || false,
        claimed: user.claimed || false
      }
    });
  } catch (err: any) {
    console.error("reward error:", err);
    res.status(500).json({ error: err.toString() });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`🚀 MemeAstro backend running on http://localhost:${PORT}`);
});
