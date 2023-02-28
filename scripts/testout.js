const { ethers } = require("hardhat");


const data = '0x000000000000000000000000429799be2fae093b88ec664829b177b7a8dbde57';




const contract_address = ethers.utils.defaultAbiCoder.decode(
    ['address'], data
)

console.log(contract_address)