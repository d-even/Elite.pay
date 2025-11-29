// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TinyReward is Ownable, ReentrancyGuard {
    uint256 public constant MIN_REWARD = 5;   // 5 wei
    uint256 public constant MAX_REWARD = 10;  // 10 wei

    uint256 private nonce;

    event RewardPaid(address indexed to, uint256 amount);

    constructor() Ownable(msg.sender) {
        nonce = 1;
    }

    // Contract can receive ETH to fund rewards
    receive() external payable {}

    function claimReward() external nonReentrant returns (uint256) {
        require(address(this).balance >= MIN_REWARD, "Pool empty");

        uint256 random = _random();
        uint256 reward = MIN_REWARD + (random % (MAX_REWARD - MIN_REWARD + 1));  
        // Generates 5–10 wei

        if (reward > address(this).balance) {
            reward = address(this).balance;
        }

        payable(msg.sender).transfer(reward);
        emit RewardPaid(msg.sender, reward);

        return reward;
    }

    function poolBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdraw(address payable to, uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Not enough balance");
        to.transfer(amount);
    }

    function _random() private returns (uint256) {
        uint256 r = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    msg.sender,
                    nonce
                )
            )
        );
        nonce++;
        return r;
    }
}
