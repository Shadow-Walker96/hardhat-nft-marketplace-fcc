const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const args = []
    const nftMarketplace = await deploy("NftMarketplace", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...........")
        await verify(nftMarketplace.address, args)
    }
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "nftmarketplace"]

// yarn hardhat deploy
// yarn run v1.22.19
// warning package.json: No license field
// $ /home/shadow-walker/hardhat-nft-marketplace-fcc/node_modules/.bin/hardhat deploy
// Compiled 1 Solidity file successfully
// ----------------------------------------------------
// deploying "NftMarketplace" (tx: 0x7186a8cbd386a09b79c5f7662d1a36cf6e6ea28a04f53736ffee079a25508af3)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 1355991 gas
// ----------------------------------------------------
// Done in 55.65s.
