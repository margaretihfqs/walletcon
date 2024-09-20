require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
// INSERT PRIVATE KEY INTO ACCOUNTs. make sure to leave it secure.
module.exports = {
  solidity: "0.8.24",
  networks: {
    mainnet: {
      url: "https://rpc.ankr.com/eth",
      accounts: [""]
    },
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com		",
      accounts: [""]
    }
  },
};
