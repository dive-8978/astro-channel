const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router();

const db = new sqlite3.Database('./testbridge.db');

// 模拟 tx 验证
router.post('/verifyTx', (req,res)=>{
  const { txHash, fromChain, toChain, expectedFrom, expectedTo, token, amount } = req.body;
  if(!txHash) return res.json({success:false,message:'缺少 txHash'});

  db.get('SELECT * FROM txHistory WHERE txHash=?',[txHash], (err,row)=>{
    if(row) return res.json({success:false,message:'Tx 已处理'});

    const timestamp = new Date().toISOString();
    db.run(`INSERT INTO txHistory (txHash, fromChain, toChain, token, amount, fromAddress, toAddress, timestamp)
            VALUES (?,?,?,?,?,?,?,?)`,
      [txHash, fromChain, toChain, token, amount, expectedFrom, expectedTo, timestamp]);

    const nftId = `TestNFT #${Math.floor(Math.random()*1000)}`;
    db.run(`INSERT INTO nftRewards (address, nftId, points, txHash, timestamp)
            VALUES (?,?,?,?,?)`, [expectedFrom, nftId, 1, txHash, timestamp]);

    res.json({success:true,message:'测试交易成功，NFT发放', nftId});
  });
});

router.get('/txHistory', (req,res)=>{
  db.all('SELECT * FROM txHistory ORDER BY id DESC LIMIT 20',[],(err,rows)=>{
    res.json(rows);
  });
});

module.exports = router;
