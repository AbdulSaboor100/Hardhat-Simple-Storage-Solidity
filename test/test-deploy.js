const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("Simple Storage", () => {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start favorite number with 0", async () => {
    const currentValue = await simpleStorage.retreive();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update favorite number to 7", async () => {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);
    const updateValue = await simpleStorage.retreive();
    assert.equal(updateValue.toString(), expectedValue);
  });

  it("Should add people", async () => {});
});
