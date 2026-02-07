import { Pool } from 'pg';
import dotenv from 'dotenv';

// 加载 .env 配置
dotenv.config();

// 创建 PostgreSQL 连接池
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // 如果使用 SSL 连接
});

// 测试数据库连接
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('DB Error:', err); // 如果连接失败，输出错误信息
  } else {
    console.log('DB Connected'); // 成功连接时输出
  }
});
