const { ethers, run, network } = require("hardhat");

const main = async () => {
  const contractFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract");
  const simpleStorage = await contractFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Simple Storage Deployed To ${simpleStorage.address}`);
  if (network.config.chainId === 5 && process.env.ETHER_SCAN_API_KEY) {
    console.log("Verifying Contract....");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retreive();
  console.log(`Current Value is ${currentValue}`);
  const transactionResponse = await simpleStorage.store("76");
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retreive();
  console.log(`Updated Value is ${updatedValue}`);
  const addPeopleTransactionRes = await simpleStorage.addPeople(
    "55",
    "abdulsaboor"
  );
  addPeopleTransactionRes.wait(1);
  const people = await simpleStorage.nameToNumber("abdulsaboor");
  console.log(`People are: ${people}`);
};

const verify = async (contactAddress, args) => {
  try {
    await run("verify:verify", {
      address: contactAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error?.message?.toLowerCase()?.includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(error);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
