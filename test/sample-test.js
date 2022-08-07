const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SFT", function () {
  it("Should deploy the Semi-Fungible Token", async function () {
    const SFT = await ethers.getContractFactory("SFT");
    const sft = await SFT.deploy(
      "https://api.jsonbin.io/v3/qs/62ec2b9a5c146d63ca5f288f"
    );
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
