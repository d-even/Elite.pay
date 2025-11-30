TinyReward – Sepolia ETH Reward Smart Contract

TinyReward is a minimal Ethereum smart contract deployed on Sepolia testnet that allows any user to claim a random reward between 5–10 wei.
The contract owner funds the pool and the contract distributes tiny amounts of ETH to users.

Step 1: This repository contains:

	A Solidity smart contract (TinyReward.sol)

	A React frontend (App.js)


🛠 Deployment Guide (Remix + MetaMask)
1. Open Remix

https://remix.ethereum.org

2. Create a new file

TinyReward.sol → paste the contract code.

3. Compile

Compiler: 0.8.19

Enable Auto compile

No warnings expected.

4. Deploy the contract

Select:

Environment: Injected Provider – MetaMask
Network: Sepolia (11155111)
Account: CONTRACT OWNER WALLET


Then click Deploy.

Accept MetaMask transaction → wait for confirmation.

5. Get your contract address

After deployment Remix will show:

TinyReward deployed at: 0x....


Copy this address.

💰 Funding the Reward Pool (Owner Only)

For rewards to work, the contract must have ETH.

Open MetaMask

Select the owner wallet

Paste your contract address

Send 0.001 ETH (or any amount)

Confirm

To verify balance:

In Remix → expand your contract → click:

poolBalance()

🎁 Claiming Rewards (User Side)

Switch MetaMask account to a user wallet

Open the React app (see below)

Click Connect Wallet

Click Claim Reward

Confirm the MetaMask transaction

You will receive 5–10 wei on-chain

View reward details in Etherscan under:

Logs → RewardPaid event

🖥 React Frontend Setup
1. Create React App
npx create-react-app reward-ui
cd reward-ui

2. Install Ethers.js
npm install ethers

3. Replace src/App.js with the provided file
4. Add ABI in App.js
const CONTRACT_ABI = [ ...ABI_HERE... ];
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";

5. Run the app
npm start

🔗 React Functions
Connect Wallet
const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

Claim Reward
const tx = await contract.claimReward();
await tx.wait();

Display reward

Your UI shows:

Reward claimed! Tx Hash: ...

🔍 Checking Transaction on Etherscan

Visit:

https://sepolia.etherscan.io/tx/<your_tx_hash>


Look under Logs → RewardPaid to see:

User address

Amount rewarded (5–10 wei)