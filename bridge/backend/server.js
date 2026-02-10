const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 路由
const verifyRouter = require('./routes/verify');
const bridgeRouter = require('./routes/bridge');
const rewardRouter = require('./routes/reward');

app.use('/api', verifyRouter);
app.use('/api', bridgeRouter);
app.use('/api', rewardRouter);

// 健康检查
app.get('/api/health', (req,res)=>res.json({status:'ok'}));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`✅ 测试版服务启动: ${PORT}`));
