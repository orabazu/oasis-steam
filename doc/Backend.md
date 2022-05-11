![TILE Games Logo](./img/logo.png) 

## Backend

### Smart Contracts

Here are tested functionalities of **smart contracts** for transactions, as a part of [`TileManager.sol`:](https://github.com/albert-vo-crypto/tile-games/blob/main/contracts/TileManager.sol)

1. mintGovernorNFT
2. swapTileForRose
3. buyTile
4. setTileToken
5. setGamerNFTContract
6. setAdvertiserNFTContract
7. setAdvertisementNFTContract
8. setGovernorNFTContract
9. setAdPrice 

### Database Tables

```js
// data table for advertisements
const adsSchema = {
  advertisementId: Number,
  date: String,
  advertisementTitle: String,
  advertisementDescription: String,
  advertisementUrl: String,
  advertisementStatus: String,
};

// data table for transactions
const transactionsSchema = {
  transactionId: String,
  date: String,
  transactionType: String,
  from: String,
  to: String,
  game: String,
  amount: Number,
};
```

### How to Create Oasis Wallet:
1.  Go to https://docs.oasis.dev/general/manage-tokens/oasis-wallets/web to read about how to create an Oasis Wallet.
2.  To Create an Oasis Wallet, go this link and follow instructions on creating a New Wallet.
On the upper right hand corner, there is a dropdown for the network to connect to.
Choose Testnet (not Mainnet because you can get TEST tokens for development)
https://wallet.oasisprotocol.org/ 
3.  Go to Oasis Testnet Faucet to get TEST Tokens (to pay for gas fees for smart conttracts)
https://faucet.testnet.oasis.dev/
4. Enter your Wallet address (show in upper right hand of the Oasis Wallet web browser) and Choose `Emerald Network` 
to add the Emerald Test Net to your Metamask (browser).
5. Watch [this YouTube video](https://www.youtube.com/watch?v=ax_kQdXZidM)


### How to Setup Oasis Testnet, Wallet, and Docker
How to set Oasis Emerald testnet in metamask 
1.  Open Metamask
2.  Add `New Network`
3.  Enter the following data

```
- Network Name: Emerald Testnet
- RPC URL: https://testnet.emerald.oasis.dev/
- Chain ID: 42261
- Symbol: ROSE
```

Congratulations! You are now on Emerald Testnet Network

4.  To start development using Oasis Wallet as the base,  clone this repo:

`git clone https://github.com/albert-vo-crypto/oasis-wallet-web.git `

5.  For running Docker, first install Docker for your laptop.
- If you have a PC/Windows laptop, install Docker Desktop.
https://docs.docker.com/desktop/windows/install/
- If you have a Mac, go to [this page](https://docs.docker.com/desktop/mac/install/)

6. For further documentation, visit [Emerald Paratime page.](https://docs.oasis.dev/general/developer-resources/emerald-paratime#web3-gateway)


**Index**

1. [Background](Background.md)
2. [Unique Value Proposition](UniqueValueProposition.md)
3. [System Architecture](SystemArchitecture.md)
4. [Tokenomics](Tokenomics.md)
5. **Backend**
6. [Frontend](Frontend.md)
7. [Game A: Crypto Shooter](GameA.md)
8. [Game B: Crypto Cards](GameB.md)
9. [Technology/Tool Stack](TechnologyStack.md)
10. [Future Work for TILE Games](FuturePlans.md)
11. [Branding](Branding.md)

<hline></hline>

[Back to Main GitHub Page](../README.md) | [Back to Documentation Index Page](Documentation.md)
