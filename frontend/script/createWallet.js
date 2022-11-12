const { Wallet } = require("fuels");

const wallet = Wallet.generate();

const walletAddress = wallet.address.toString();

const pk = wallet.privateKey;

console.log({ walletAddress, pk });
