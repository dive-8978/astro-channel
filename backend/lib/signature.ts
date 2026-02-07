import { ethers } from 'ethers';

/**
 * 验证签名
 * @param wallet - 用户钱包地址
 * @param message - 消息
 * @param signature - 签名
 * @returns boolean - 签名是否有效
 */
export async function verifySignature(
  wallet: string,
  message: string,
  signature: string
): Promise<boolean> {
  try {
    // 使用 ethers.js 库从消息和签名恢复出签名者地址
    const recovered = ethers.utils.verifyMessage(message, signature);
    
    // 比较恢复的地址与用户钱包地址是否匹配
    return recovered.toLowerCase() === wallet.toLowerCase();
  } catch {
    // 如果发生错误（例如签名无效），返回 false
    return false;
  }
}
