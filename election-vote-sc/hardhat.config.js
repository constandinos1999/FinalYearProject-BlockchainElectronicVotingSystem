require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/9278c04944064d5a8f9ad13e549e550c",
      accounts: {
        mnemonic: "ankle crawl train lens forget nasty enforce blame mesh exotic random drill"
      }
    }
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
