const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SFT", function () {
  it("Should deploy the Semi-Fungible Token", async function () {
    const SFT = await ethers.getContractFactory("SFT");
    const sft = await SFT.deploy(
      "https://api.jsonbin.io/v3/qs/62ec2b9a5c146d63ca5f288f"
    );
    await sft.deployed();
    console.log("Contract deployed to:", sft.address);

    let txn = await sft.mint(msg.sender);
    console.log("Minted NFT 1");
    await txn.wait();

    //expect(await sft.greet()).to.equal("Hello, world!");
    expect(await sft.uri(1)).to.equal(
      "https://api.jsonbin.io/v3/qs/62ec2b9a5c146d63ca5f288f"
    );

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
