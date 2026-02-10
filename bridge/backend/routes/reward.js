const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router();

const db = new sqlite3.Database('./testbridge.db');

router.get('/reward', (req,res)=>{
  const address = (req.query.address||'').toLowerCase();
  if(!address) return res.json({nfts:[]});

  db.all('SELECT * FROM nftRewards WHERE address=? ORDER BY id DESC', [address], (err, rows)=>{
    const nfts = rows.map(r=>r.nftId);
    res.json({nfts});
  });
});

module.exports = router;
