// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MemeAstro is ERC20, Pausable, Ownable2Step {
    using ECDSA for bytes32;

    string public constant NAME = "MemeAstro";
    string public constant SYMBOL = "MA";
    uint256 public constant DECIMALS = 18;
    uint256 public constant TOTAL_SUPPLY = 100_000_000_000 * 10**DECIMALS; // 1000亿
    uint256 public constant AIRDROP_SUPPLY = 35_000_000_000 * 10**DECIMALS; // 350亿
    uint256 public constant LOCK_PERIOD = 90 days;

    address public signer;
    mapping(address => bool) public claimed;
    mapping(address => uint256) public unlockTime;
    uint256 public airdropClaimed;

    event AirdropClaimed(address indexed user, uint256 amount, uint256 unlockTime);

    constructor(address _signer) ERC20(NAME, SYMBOL) {
        signer = _signer;
        _mint(address(this), TOTAL_SUPPLY);
    }

    function claimAirdrop(uint256 rewardAmount, bytes calldata signature) external whenNotPaused {
        address user = msg.sender;
        require(!claimed[user], "Already claimed");
        require(rewardAmount > 0, "Zero reward");
        require(airdropClaimed + rewardAmount <= AIRDROP_SUPPLY, "Airdrop exhausted");

        bytes32 message = keccak256(
            abi.encodePacked(
                "Claim MemeAstro Airdrop",
                user,
                rewardAmount,
                block.chainid
            )
        );
        require(
            message.toEthSignedMessageHash().recover(signature) == signer,
            "Invalid signature"
        );

        claimed[user] = true;
        unlockTime[user] = block.timestamp + LOCK_PERIOD;
        airdropClaimed += rewardAmount;
        _transfer(address(this), user, rewardAmount);

        emit AirdropClaimed(user, rewardAmount, unlockTime[user]);
    }

    function setSigner(address _newSigner) external onlyOwner {
        signer = _newSigner;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        if (block.timestamp < unlockTime[msg.sender]) revert("MA locked for 3 months");
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        if (block.timestamp < unlockTime[from]) revert("MA locked for 3 months");
        return super.transferFrom(from, to, amount);
    }
}
