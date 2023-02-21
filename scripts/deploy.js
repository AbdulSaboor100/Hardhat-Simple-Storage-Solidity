const { ethers } = require("hardhat");

const main = async () => {
  const contractFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract");
  const simpleStorage = await contractFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Simple Storage Deployed To ${simpleStorage.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
