const { ethers} = require("hardhat")

const PRICE = ethers.utils.parseEther("0.1")

async function mintAndList() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    basicNft = await ethers.getContract("BasicNft")
    console.log("Minting NFT...")

    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log("Approving NFT...")

    const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
    await approvalTx.wait(1)
    console.log("Listing NFT...")
    
    const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
    await tx.wait(1)
    console.log("NFT Listed!")
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

// First run yarn hardhat node to start the local blockchain
// second run yarn hardhat run scripts/mint-and-list.js --network localhost

// yarn hardhat run scripts/mint-and-list.js --network localhost
// yarn run v1.22.19
// warning package.json: No license field
// $ /home/shadow-walker/hardhat-nft-marketplace-fcc/node_modules/.bin/hardhat run scripts/mint-and-list.js --network localhost
// Minting NFT...
// Approving NFT...
// Listing NFT...
// NFT Listed!
// Done in 19.66s.
