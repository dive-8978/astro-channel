import { ethers } from "ethers";
import { getUser, db } from "./db";

// 后端私钥，用于签名 EIP-712
const PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY || "";
if (!PRIVATE_KEY) throw new Error("Missing SIGNER_PRIVATE_KEY in .env");

const walletSigner = new ethers.Wallet(PRIVATE_KEY);

// EIP-712 Domain
const domain = {
  name: "MemeAstroAirdrop",
  version: "1",
  chainId: 56, // BSC 主网
  verifyingContract: process.env.AIRDROP_CONTRACT_ADDRESS || ""
};

// EIP-712 类型
const types = {
  Claim: [
    { name: "wallet", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "lockUntil", type: "uint256" }
  ]
};

// 生成签名
export async function signClaim(walletAddress: string) {
  const user = getUser(walletAddress);
  if (!user) throw new Error("User not found");

  const amount = user.reward;
  if (!amount || amount <= 0) throw new Error("No reward assigned");

  // 锁仓 3 个月
  const now = Math.floor(Date.now() / 1000);
  const lockUntil = now + 90 * 24 * 3600; // 90 天秒数

  const value = {
    wallet: walletAddress,
    amount,
    lockUntil
  };

  const signature = await walletSigner._signTypedData(domain, types, value);

  // 更新数据库标记已领取（可选择在 claim.ts 里再确认一次）
  db.prepare("UPDATE users SET claimed = 1 WHERE wallet = ?").run(walletAddress);

  return { signature, amount, lockUntil };
}
