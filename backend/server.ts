import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// 导入各个 API 路由
import verifyImei from './api/verify-imei';
import verifyX from './api/verify-x';
import verifyBridge from './api/verify-bridge';
import reward from './api/reward';
import claim from './api/claim';

const app = express();

// 跨域和 JSON 解析
app.use(cors());
app.use(express.json());

// API 路由
app.use('/api/verify-imei', verifyImei);
app.use('/api/verify-x', verifyX);
app.use('/api/verify-bridge', verifyBridge);
app.use('/api/reward', reward);
app.use('/api/claim', claim);

// 启动服务
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
