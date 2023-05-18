import { factoryAddress } from "./address";

export const bitQuery = `query{
    ethereum(network: bsc_testnet) {
      smartContractEvents(
        smartContractAddress: {is: "${factoryAddress}"}
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