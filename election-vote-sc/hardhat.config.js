require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: "X5JJ9ETK5Z4XIDYH123EKFZ3ZJVBJWBWJI"
  },
  networks: {
    binance: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      gasPrice: 20000000000,
      chainId: 97,
      accounts:  [`0xbd4116a09b9a4fd47d62f3311ff20f012e49e60fa950da2dd2a58469c6cd7881`]
    },
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
