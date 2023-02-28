require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

const { API_URL, PRIVATE_KEY } = process.env;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "polygon_mumbai",
  networks: {
     hardhat: {},
     polygon_mumbai: {
        url: API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
     }
  },
}
