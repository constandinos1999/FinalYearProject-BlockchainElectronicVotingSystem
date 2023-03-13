export const bitQuery = `query{
    ethereum(network: bsc_testnet) {
      smartContractEvents(
        smartContractAddress: {is: "0x1144365C83Bc33949e4f6a437237F38A5de5462f"}
        smartContractEvent: {is: "CreatedElection"}
        options: {desc: "block.height", limit: 10}
      ) {
        block {
          height
        }
        arguments {
          value
          argument
          argumentType
        }
      }
    }
  }
  `;