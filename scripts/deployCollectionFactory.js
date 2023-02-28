const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CollectionFactory = await hre.ethers.getContractFactory(
    "CollectionFactory"
  );
  const collectionFactory = await CollectionFactory.deploy();

  await collectionFactory.deployed();

  console.log("Collection Contract deployed to:", collectionFactory.address);

}

// 0xfC20A30BFf58F818CF0Fe0391e58dF79E8EcBFb6
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
