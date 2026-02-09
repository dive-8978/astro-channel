import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import verifyImei from "./api/verify-imei";
import verifyX from "./api/verify-x";
import verifyBridge from "./api/verify-bridge";
import reward from "./api/reward";
import claim from "./api/claim";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// API 路由
app.post("/api/verify-imei", verifyImei);
app.post("/api/verify-x", verifyX);
app.post("/api/verify-bridge", verifyBridge);
app.get("/api/reward", reward);
app.post("/api/claim", claim);

// 可选：服务前端静态文件
app.use("/", express.static(path.join(__dirname, "../publi—airdrop.html")));

// 启动服务
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
