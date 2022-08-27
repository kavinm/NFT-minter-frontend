// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const AddressStorage = await hre.ethers.getContractFactory(
    "SFTFactory"
  );
  const addressStorage = await AddressStorage.deploy();

  await addressStorage.deployed();

  console.log("SFT Factory Contract deployed to:", addressStorage.address);

}


// CONTRACT ADDY IS 0x6b1eeAC57f9A040e8c104cD3cABD602ff20E55E5
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });