// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeAstro is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000_000 * 10 ** 18; // 1000亿 MA
    mapping(address => uint256) public lockUntil;

    constructor() ERC20("MemeAstro", "MA") {
        _mint(address(this), 350_000_000_000 * 10 ** 18); // 空投池 35%
        _mint(msg.sender, 650_000_000_000 * 10 ** 18); // 生态发展 65%
    }

    function claim(address to, uint256 amount, uint256 unlockTime) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Insufficient balance in contract");
        _transfer(address(this), to, amount);
        lockUntil[to] = unlockTime;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        if (from != address(0)) { // not mint
            require(block.timestamp >= lockUntil[from], "Tokens are locked");
        }
        super._beforeTokenTransfer(from, to, amount);
    }
}
