// server.js
import express from "express";
import { ethers } from "ethers";
import cors from "cors";

const RPC_URL = ""; // <-- your RPC URL
const PRIVATE_KEY = ""; // user/owner private key
const CONTRACT_ADDRESS = "";

const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "claimReward",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/claim", async (req, res) => {
  try {
    console.log("ESP32 triggered reward...");

    const tx = await contract.claimReward();
    const receipt = await tx.wait();

    console.log("Reward claimed:", receipt.hash);

    res.json({
      success: true,
      txHash: receipt.hash,
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

