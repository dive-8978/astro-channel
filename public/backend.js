const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 数据持久化文件
const DATA_DIR = __dirname;
const KYC_FILE = path.join(DATA_DIR, 'kyc.json');
const REWARD_FILE = path.join(DATA_DIR, 'rewards.json');
const HISTORY_FILE = path.join(DATA_DIR, 'txHistory.json');

// 初始化数据
let kycDatabase = {};
let nftRewards = {};
let txHistory = [];

const tokenRates = {
  ASTRO: { price: 0.05, fee: 0.001 },
  USDT: { price: 1.0, fee: 0.0005 },
  USDC: { price: 1.0, fee: 0.0005 }
};

// 加载数据
function loadData() {
  try {
    if (fs.existsSync(KYC_FILE)) kycDatabase = JSON.parse(fs.readFileSync(KYC_FILE, 'utf8'));
    if (fs.existsSync(REWARD_FILE)) nftRewards = JSON.parse(fs.readFileSync(REWARD_FILE, 'utf8'));
    if (fs.existsSync(HISTORY_FILE)) txHistory = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  } catch (e) {
    console.log('⚠️ Data load error, starting fresh');
  }
}
loadData();

// 保存数据
function saveData() {
  try {
    fs.writeFileSync(KYC_FILE, JSON.stringify(kycDatabase, null, 2));
    fs.writeFileSync(REWARD_FILE, JSON.stringify(nftRewards, null, 2));
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(txHistory, null, 2));
  } catch (e) {
    console.log('⚠️ Data save error');
  }
}

// ===== KYC 接口 =====
app.get('/api/kyc', (req, res) => {
  const address = req.query.address;
  if (!address) return res.status(400).json({ error: 'Missing address' });
  const lowerAddr = address.toLowerCase();
  const verified = !!kycDatabase[lowerAddr];
  res.json({ verified });
});

// ===== NFT 奖励接口 =====
app.get('/api/reward', (req, res) => {
  const address = req.query.address;
  if (!address) return res.status(400).json({ error: 'Missing address' });
  const lowerAddr = address.toLowerCase();
  const nfts = nftRewards[lowerAddr] || [];
  res.json({ nfts });
});

// ===== Token 汇率接口 =====
app.get('/api/rates', (req, res) => {
  const token = req.query.token?.toUpperCase();
  if (!token || !tokenRates[token]) {
    return res.status(400).json({ error: 'Invalid token' });
  }
  res.json(tokenRates[token]);
});

// ===== 记录交易 =====
app.post('/api/recordTx', (req, res) => {
  const { from, to, amount, time, token, fromAddress, toAddress } = req.body;
  if (!from || !to || !amount || !time || !token) {
    return res.status(400).json({ status: 'error', message: 'Missing fields' });
  }
  const tx = {
    fromChain: from,
    toChain: to,
    token,
    amount,
    time,
    fromAddress: fromAddress || 'unknown',
    toAddress: toAddress || 'unknown'
  };
  txHistory.unshift(tx);
  // 自动发 NFT
  const lowerAddr = fromAddress.toLowerCase();
  if (!nftRewards[lowerAddr]) nftRewards[lowerAddr] = [];
  nftRewards[lowerAddr].push(`AstroNFT #${nftRewards[lowerAddr].length + 1}`);
  saveData();
  res.json({ status: 'ok' });
});

// ===== 获取交易历史 =====
app.get('/api/txHistory', (req, res) => {
  res.json(txHistory.slice(0, 20));
});

// ===== 健康检查 =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'AstroBridge',
    txCount: txHistory.length,
    kycCount: Object.keys(kycDatabase).length
  });
});

// ===== 启动 =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AstroBridge backend running on port ${PORT}`);
  console.log(`📊 Transactions: ${txHistory.length}`);
  console.log(`🔍 KYC entries: ${Object.keys(kycDatabase).length}`);
  console.log(`🎁 Reward entries: ${Object.keys(nftRewards).length}`);
});
