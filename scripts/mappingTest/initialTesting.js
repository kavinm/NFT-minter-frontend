const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  
    let accounts = await ethers.getSigners();
    let eoa = accounts[0];
    let factory = await ethers.getContractFactory("CollectionFactory");

    let contract = factory.attach("0xfC20A30BFf58F818CF0Fe0391e58dF79E8EcBFb6");

    const tx = await contract['addCollection(string,string,string,string,string,string)'](
        "Test Collection Name",
        "GG",
        "http://googl.come",
        "Test description",
        "Jan 1 2000",
        "Event Name"
        );
    

    const tx1 = await contract.addressMapping["0xf228F1B867445c5cD36e8210aa6EA3608D3D4622"];
      
    console.log("tx: ", tx1);


  }
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
