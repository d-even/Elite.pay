// App.js
import React, { useState } from "react";
import { ethers } from "ethers";

// -------------------------------------------------------
// 🔹 REPLACE THESE WITH YOUR CONTRACT DETAILS
// -------------------------------------------------------
const CONTRACT_ADDRESS = "0x8A033f4B242c3deF430ed6C7Acf0147C30A27f7a"; // <-- paste your contract address
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "MIN_REWARD",
    "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_REWARD",
    "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimReward",
    "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolBalance",
    "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed":true,"internalType":"address","name":"to","type":"address"},
      {"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}
    ],
    "name": "RewardPaid",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType":"address","name":"","type":"address"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs": [{"internalType":"address","name":"newOwner","type":"address"}],
    "name":"transferOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs": [],
    "name":"renounceOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  }
];

// -------------------------------------------------------

function App() {
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // Connect MetaMask
  // -------------------------------
  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not detected!");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(accounts[0]);
    setStatus("Wallet connected: " + accounts[0]);
  };

  // -------------------------------
  // Claim Reward
  // -------------------------------
  const claimReward = async () => {
    try {
      if (!wallet) return alert("Please connect wallet first.");

      setLoading(true);
      setStatus("Waiting for MetaMask confirmation...");

      // Connect provider + signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Connect contract
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      // Call claimReward()
      const tx = await contract.claimReward();
      setStatus("Transaction sent. Waiting for confirmation...");

      const receipt = await tx.wait();

      // Show success
      setStatus(
        `Reward claimed! Tx Hash: ${receipt.hash.substring(0, 12)}...${receipt.hash.slice(-6)}`
      );
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TinyReward – Claim Sepolia ETH</h1>

      {!wallet ? (
        <button style={styles.button} onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p style={styles.walletText}>Connected: {wallet}</p>

          <button
            style={styles.button}
            onClick={claimReward}
            disabled={loading}
          >
            {loading ? "Processing..." : "Claim Reward"}
          </button>
        </div>
      )}

      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
}

// -------------------------------------------------------
// Basic Styling
// -------------------------------------------------------
const styles = {
  container: {
    minHeight: "100vh",
    background: "#0d0f16",
    color: "white",
    textAlign: "center",
    paddingTop: "80px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#6ae3ff",
  },
  button: {
    background: "#0a84ff",
    border: "none",
    padding: "15px 30px",
    borderRadius: "12px",
    fontSize: "18px",
    cursor: "pointer",
    color: "white",
    marginTop: "20px",
  },
  walletText: {
    marginTop: "10px",
    fontSize: "14px",
    opacity: 0.8,
  },
  status: {
    marginTop: "20px",
    fontSize: "14px",
    opacity: 0.9,
  },
};

export default App;
