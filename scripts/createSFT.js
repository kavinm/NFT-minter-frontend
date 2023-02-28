const { ethers } = require("hardhat");

async function main() {
  
    let factory = await ethers.getContractFactory("AddressToCollection");

    let contract = factory.attach("0xfC20A30BFf58F818CF0Fe0391e58dF79E8EcBFb6");

    const tx = await contract.methods.multiMint(
        ["0x77a2b55Ed821bC73CF9730E33a25F17f1654aB33"],
        "https://gateway.pinata.cloud/ipfs/QmXy3A6NJPb2BMxzVoVqXKXM9358o594Y24ZoqbrjiZ8Aa",
        0,
        "0x429799be2FaE093B88eC664829b177B7A8DbDe57"
    )


    const tx = await contract['multiMint(address[], string, uint256, address)'](
        ["0x77a2b55Ed821bC73CF9730E33a25F17f1654aB33"],
        "https://gateway.pinata.cloud/ipfs/QmXy3A6NJPb2BMxzVoVqXKXM9358o594Y24ZoqbrjiZ8Aa",
        0,
        "0x429799be2FaE093B88eC664829b177B7A8DbDe57"
        );
    

    
    console.log("tx: ", tx);


  }
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
