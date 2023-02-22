const { task } = require("hardhat/config");

task("blockNumber", "Prints the current block number").setAction(
  async (taskArgs, { ethers }) => {
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log(`Current Block Number: ${blockNumber}`);
  }
);

module.exports = {};
