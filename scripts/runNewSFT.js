const { ethers } = require("hardhat");

async function main() {
  
    let factory = await ethers.getContractFactory("CollectionFactory");

    let contract = factory.attach("0xfC20A30BFf58F818CF0Fe0391e58dF79E8EcBFb6");

    const tx = await contract.createNewContract();
    const reciept = await tx.wait();

    console.log(reciept)
    const data = reciept.logs[0].data;



    const contract_address = ethers.utils.defaultAbiCoder.decode(
        ['address'], data
    )
      
    console.log("tx: ", tx);
    console.log(data);
    console.log(contract_address);

  }
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
