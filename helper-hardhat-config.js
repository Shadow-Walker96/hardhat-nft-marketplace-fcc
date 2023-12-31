// 16:20:43 -----> Raffle.sol Staging Tests
// from 16:20:43  to 16:30:58

const { ethers } = require("hardhat")

const networkConfig = {
    31337: {
        name: "localhost",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: ethers.utils.parseEther("0.01"), // 0.01 ETH
        callbackGasLimit: "500000", // 500,000 gas
    },
    11155111: {
        name: "sepolia",
        subscriptionId: "4647",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: ethers.utils.parseEther("0.01"), // 0.01 ETH
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndContractsFile = "../nextjs-nft-marketplace-moralis-fcc/constants/networkMapping.json"
const frontEndContractsFile2 =
    "../nextjs-nft-marketplace-thegraph-fcc/constants/networkMapping.json"
const frontEndAbiLocation = "../nextjs-nft-marketplace-moralis-fcc/constants/"
const frontEndAbiLocation2 = "../nextjs-nft-marketplace-thegraph-fcc/constants/"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractsFile,
    frontEndContractsFile2,
    frontEndAbiLocation,
    frontEndAbiLocation2,
}
