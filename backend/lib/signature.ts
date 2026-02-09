import { ethers } from "ethers";
import { db } from "./db";

/**
 * ===============================
 * 私钥配置
 * ===============================
 * 建议在 .env 中配置：
 * AIRDROP_SIGNER_PRIVATE_KEY=0x...
 */
const signerPrivateKey = process.env.AIRDROP_SIGNER_PRIVATE_KEY;
if (!signerPrivateKey) throw "Missing AIRDROP_SIGNER_PRIVATE_KEY in .env";

const wallet = new ethers.Wallet(signerPrivateKey);

/**
 * ===============================
 * EIP-712 结构
 * ===============================
 */
const DOMAIN = {
  name: "MemeAstroAirdrop",
  version: "1",
  chainId: 56, // BSC Mainnet
  verifyingContract: process.env.AIRDROP_CONTRACT || "0xYourContractAddress",
};

const TYPES = {
  Claim: [
    { name: "wallet", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "lockUntil", type: "uint256" }
  ]
};

/**
 * ===============================
 * 生成签名
 * ===============================
 */
export function signClaim(walletAddress: string) {
  // 1️⃣ 获取用户奖励
  const user = db.getUser(walletAddress);
  if (!user) throw "User not found";
  if (!user.reward || user.reward <= 0) throw "No reward assigned";
  if (user.claimed) throw "Already claimed";

  const amount = user.reward;
  const now = Math.floor(Date.now() / 1000);
  const lockUntil = now + 60 * 60 * 24 * 30 * 3; // 3个月锁仓

  const message = { wallet: walletAddress, amount, lockUntil };
  const signature = wallet._signTypedData(DOMAIN, TYPES, message);

  return { signature, amount, lockUntil };
}
