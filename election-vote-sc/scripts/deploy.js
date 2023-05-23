// The Hardhat Runtime Environment is explicitly required here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const ElectionFact = await hre.ethers.getContractFactory("ElectionFactory");
  const electionFact = await ElectionFact.deploy();

  await electionFact.deployed();

  console.log(
    `ElectionFact deployed to ${electionFact.address}`
  );
}

// This pattern is recommended to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
