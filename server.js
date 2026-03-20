// server.js
const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000; // 你可以改成其他端口

// 提供 public 文件夹静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 默认首页访问 iconsole.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'console.html'));
});

// 监听端口
app.listen(PORT, () => {
  console.log(`AstroBridge Console running on http://localhost:${PORT}`);
});
