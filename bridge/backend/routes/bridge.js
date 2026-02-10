const express = require('express');
const router = express.Router();

router.post('/bridge', (req,res)=>{
  // 测试版直接返回成功
  res.json({success:true,message:'模拟跨链成功'});
});

module.exports = router;
