const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

//*vars
const MNEMONIC = process.env.MNEMONIC;
const API_KEY = process.env.NODE_KEY;

//* Remember to write the nft address in manually after deploying the contract
// ################## CHANGE 1: Added nft_contract_address after run the migrate command & you will find the nft_contract_address in the log under 2_deploy_token.js ##################
// ################## CHANGE 2: Added owner_address which is METAMASK ETCH Account public address ##################
const NFT_CONTRACT_ADDRESS = "0x57e7E5B232a026E842dF6d0861f54CF03F9F3545";
const OWNER_ADDRESS = "0x64c58412d3a1aB9e8Ef915EcACdcbF102e05E82f";
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`;
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`;
const NUM_ITEMS = 5;

//*Parse the contract artifact for ABI reference.
let rawdata = fs.readFileSync(
  path.resolve(__dirname, "../build/contracts/GameItem.json")
);
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi;

async function main() {
  try {
    //*define web3, contract and wallet instances
    const provider = new HDWalletProvider(MNEMONIC, MUMBAI);

    const web3Instance = new web3(provider);

    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS
    );

    //* just mint
    // ################## CHANGE: Added the ipfs json URI ##################
    // ################## CHANGE: Added the ipfs json URI ##################
    await nftContract.methods
      .mintItem(
        OWNER_ADDRESS,
        `https://ipfs.io/ipfs/bafyreidiw556l5xt57uk74j3uqsrece2tr7f2qhgn5vsrvukf7qwfpxr44/metadata.json`
      )
      .send({ from: OWNER_ADDRESS })
      .then(console.log("minted"))
      .catch((error) => console.log(error));

    //* mint for a certain amount
    /*
    for (var i = 1; i < NUM_ITEMS; i++) {
      await nftContract.methods
        .mintItem(OWNER_ADDRESS, `https://ipfs.io/ipfs/QmZ13J2TyXTKjjyA46rYENRQYxEKjGtG6qyxUSXwhJZmZt/${i}.json`)
        .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));
    }
    */
  } catch (e) {
    console.log(e);
  }
}

//invoke
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
