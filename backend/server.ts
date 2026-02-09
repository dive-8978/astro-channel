import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { initDB } from "./lib/db";

import verifyImei from "./api/verify-imei";
import verifyX from "./api/verify-x";
import verifyBridge from "./api/verify-bridge";
import reward from "./api/reward";
import claim from "./api/claim";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3001);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// 初始化数据库
initDB().then(() => console.log("Database initialized")).catch(console.error);

// Routes
app.use("/api/verify-imei", verifyImei);
app.use("/api/verify-x", verifyX);
app.use("/api/verify-bridge", verifyBridge);
app.use("/api/reward", reward);
app.use("/api/claim", claim);

// Health check
app.get("/", (req, res) => res.send("MemeAstro backend running"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
