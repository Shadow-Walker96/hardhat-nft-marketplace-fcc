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
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const basicNftTwo = await deploy("BasicNftTwo", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying..........")
        await verify(basicNft.address, args)
        await verify(basicNftTwo.address, args)
    }
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "basicnft"]

// yarn hardhat deploy --tags basicnft
// yarn run v1.22.19
// warning package.json: No license field
// $ /home/shadow-walker/hardhat-nft-marketplace-fcc/node_modules/.bin/hardhat deploy --tags basicnft
// Compiled 9 Solidity files successfully
// ----------------------------------------------------
// deploying "BasicNft" (tx: 0xb58a71b69ca9e8e3bafdacc5a744f1f16d60b6d05ca4528cf335dec9d7a48597)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 2154911 gas
// deploying "BasicNftTwo" (tx: 0xd13993ec115a475c824db51816dde3d13983137e63ebc676dbd5c9e6d97593d9)...: deployed at 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 with 2147553 gas
// ----------------------------------------------------
// Done in 32.10s.
