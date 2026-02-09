import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY || "", undefined);

export function signAirdrop(wallet: string, amount: number, lockUntil: number) {
  const domain = {
    name: "MemeAstro",
    version: "1",
    chainId: Number(process.env.CHAIN_ID || 1),
    verifyingContract: "0x0000000000000000000000000000000000000000" // placeholder
  };

  const types = {
    Airdrop: [
      { name: "wallet", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "lockUntil", type: "uint256" }
    ]
  };

  const value = { wallet, amount, lockUntil };

  return signer._signTypedData(domain, types, value);
}
