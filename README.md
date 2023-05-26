## Crypto E-Vote: A blockchain e-voting dApp
-----

This project is developed at the University of Brighton by Constantine Kotsis. It is a final year software artefact that pertains to the fulfilment of the final year thesis per an undergraduate degree in BSc Computer Science (Hons).

Crypto E-Vote is a blockchain e-voting decentralised application (dApp) that integrates a blockchain network, cryptographic hashing, cryptocurrency wallets, and smart contracts. The main aims of the system are to tackle the issues faced with eleciton fraud, voter privacy and anonymity and miscount of votes as well as provide a unique approach to blockchain-based dApps.

The dApp is developed to tailor to subject specific elections for computer science students and course representative elections.

An admin account has been created to maintain and use the dApp to create new elections and add new candidates. The admin and voters pay using their cryptocurrency wallet in line with smart contracts to faciliate the creation of elections, addition of candidates and casting of votes respectively.

## Prerequisites to Starting the dApp
-----

- npm and Node are used within this system and relevant installations of both are required for the dApp to run.

- MetaMask is the software cryptocurrency wallet used to interact with the blockchain. It needs to be downloaded and added as an extension on the Chrome browser to be initialised alongisde the dApp. The link to the MetaMask extension can be added [here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn). It facilitates the importing and creation of cryptocurrency wallets for the admin and voters.

- MongoDB is the document database used for the admin and voter information. All new voters that register to the dApp will have their information such as their wallet address, name, surname, email address and password stored in the database on this software.

- BscScan is the blockchain explorer for the Binance Smart Chain and where the blockchain network is found and where the smart contracts are deployed. Smart contracts and voter transactions are seen on the TestNet side of the explorer.

## Starting and Running the Live dApp Server
----- 

The dApp is run locally in the terminal in the IDE.

The first step is to open 3 different terminals and in each change directory into the 3 main directories. This is shown below.

```
cd election-vote-ui
```
```
cd election-vote-be
```
```
cd election-vote-sc
```

The next step is that the smart contract needs to be deployed by the user to facilitate running the dApp.

To deploy the smart contract, go to the ‘**election-vote-sc**’ directory and run:
```
npx hardhat compile 
```
This will generate the artifacts required to deploy the contract.

Next is the command to deploy your contract on the Binance TestNet and return the address of the contract.

```
npx hardhat run scripts/deploy.js --network binance 
```

Running the next command will verify the smart contract on BscScan. 

The '**contactaddress**' below indicates that the contact address given from running the previous command should be pasted here.

```
npx hardhat verify --network binance *contractaddress*  
```

To integrate contract in application go to the election-vote-ui directory and then go to:

**src→constants→address.js**

Paste the contact address in the **address.js** file where the old address is written.

Go into the **'election-vote-be'** directory in the terminal you had open and run

```
npm start
```

to start up the server.

Go into the **'election-vote-ui'** directory in the terminal you had open and run 

```
npm start
```

and wait for the whole thing to be loaded. 

The dApp will then load and can be accessed from **localhost:3000** displayed in the terminal in the **'election-vote-ui'** directory after running ***npm start***.

## Further Development

***It is important to note that test tokens (tBNB) are primarily used with the system through the BNB faucet to cast votes in elections and for the admin to create elections and add candidates. This will need to be changed in the future to enable other cryptocurrencies to be used in conjunction with the dApp. In addition, the dApp will need further development but is currently working as a simple prototype. All future developments will involve further enhancements such as code refactoring and changing and improving relevant features. It currently works as a simple prototype for a final year project.***