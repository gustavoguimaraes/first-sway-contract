# Sway Language First Project

This repo is my first inroad testing the Fuel blockchain.

### Set up

Ensure you have `Rust`, `fuelup` and fuelup toolchains installed.

- compile contract

`cd eventManager`

`forc build`

- run test

`cargo test`

### Create a Wallet

In order to interact with the fuel network, an wallet address needs to be created so as to submit signed transactions with enough funds to cover network fees.

The Fuel TS SDK don't currently support Wallet integrations, requiring instead to use a non-safe wallet inside the WebApp using a privateKey.

> **Note**
> The Fuel Wallet is in active development [here](https://github.com/FuelLabs/fuels-wallet).
> Use this method of creating a wallet only for development purposes

`cd frontend`

`npm run create-wallet`

Copy the private key. Create a .env.local file from .env.example. Add the private key to it.

`cp .env.example .env.local`

> **Note**
> You will need to deploy the contract in a network: local or testnet. Take the contract adddress and it to the .env.local file
