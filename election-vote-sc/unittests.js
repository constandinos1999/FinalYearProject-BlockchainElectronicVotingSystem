const { expect } = require("chai");
const { ethers } = require("hardhat");
const electionABI = require("../artifacts/contracts/Vote.sol/Election.json");

describe("ElectionFactory", function () {
  const email = "electionadmin@gmail.com";
  const metadata = "metadata";
  let electionFactory;

  this.beforeEach(async function () {
    const ElectionFactory = await ethers.getContractFactory("ElectionFactory");

    electionFactory = await ElectionFactory.deploy();
   
    await electionFactory.deployed();
  });

  it("It should create an election when called by owner", async function () {
    await expect(electionFactory.createElection(email, metadata)).to.emit(
      electionFactory,
      "CreatedElection"
    );
    await expect(
      electionFactory.createElection(email, metadata)
    ).to.be.revertedWith("already existing election");
  });

  it("create election should revert if called by another account", async function () {
    const [owner, otherAccount] = await ethers.getSigners();

    await expect(
      electionFactory.connect(otherAccount).createElection(email, metadata)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("It should remove the election when called by the owner", async function () {
    await expect(electionFactory.createElection(email, metadata)).to.emit(
      electionFactory,
      "CreatedElection"
    );

    await expect(electionFactory.removeElection(email)).to.emit(
      electionFactory,
      "RemovedElection"
    );
  });

  it("remove election should revert when election does not exist", async function () {
    await expect(electionFactory.removeElection(email)).to.be.revertedWith(
      "election does not exist"
    );
  });

  it("should revert when remove election is not called by owner", async function () {
    const [owner, anotherAccount] = await ethers.getSigners();
    await expect(
      electionFactory.connect(anotherAccount).removeElection(email)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});

describe("Election", async function () {
  const email = [
    "candidate1@gmail.com",
    "candidate2@gmail.com",
    "candidate3@gmail.com",
    "candidate4@gmail.com",
  ];
  const metadata = ["metadata1", "metadata2", "metadata3", "metadata4"];
  let electionFactory;
  let election;
  let candidateCount;
  let voterCount;
  let electionAddr;
  this.beforeEach(async function () {
    const ElectionFactory = await ethers.getContractFactory("ElectionFactory");
    electionFactory = await ElectionFactory.deploy();
    await electionFactory.deployed();
    electionFactory.createElection(email[0], metadata[0]);
 

    electionAddr = await electionFactory.elections(email[0]);
    const signer = await ethers.getSigner();
    const abi = await electionABI.abi;
    election = new ethers.Contract(electionAddr, abi, signer);


    candidateCount = await election.getNumOfCandidates();
    voterCount = await election.getNumOfVoters();
  });

  it("should add candidate to the election", async function () {
    await election.addCandidate(email[1], metadata[1]);
    const candidate1 = await election.getCandidate(candidateCount);
    expect(candidate1[1]).to.equal(email[1]);
    expect(candidate1[2]).to.equal(metadata[1]);
    expect(candidate1[3]).to.equal(0);
    candidateCount = await election.getNumOfCandidates();
  });

  it("should remove the candidate from the election candidate mapping", async function(){
    await election.addCandidate(email[2],metadata[2]);
    await election.removeCandidate(candidateCount);
    const candidate2 = await election.getCandidate(candidateCount);
    expect(candidate2[1]).to.equal("");
    expect(candidate2[2]).to.equal("");
    expect(candidate2[3]).to.equal(0);
    candidateCount = await election.getNumOfCandidates();
  })

  it("should let users vote for candidates", async function(){
    await election.addCandidate(email[3],metadata[3]);
    const candidate = await election.getCandidate(candidateCount);
    expect(candidate[1]).to.equal(email[3]);
    expect(candidate[2]).to.equal(metadata[3]);
  

    voterCount = await election.getNumOfVoters();
  })

  it("should get number of candidates", async function() {
    const numCandidates = await election.getNumOfCandidates();
    expect(numCandidates).to.equal(candidateCount);
  });

  it("should get number of voters", async function() {
    const numVoters = await election.getNumOfVoters();
    expect(numVoters).to.equal(voterCount);
  });

  it("should get specific candidate", async function() {
    await election.addCandidate(email[1], metadata[1]);
    const candidate1 = await election.getCandidate(candidateCount);
   
    expect(candidate1[0]).to.equal(candidateCount);
    expect(candidate1[1]).to.equal(email[1]);
    expect(candidate1[2]).to.equal(metadata[1]);
    expect(candidate1[3]).to.equal(0);
  });

  it("should get winner candidate", async function() {
    await election.addCandidate("test1@test.com", "metadata1");
    await election.vote(0, "voter@test.com");
    await election.vote(0, "voter0@test.com");
    await election.vote(1, "voter1@test.com");
    const winner = await election.winnerCandidate();
    expect(winner).to.equal(0);
  });

 


});
