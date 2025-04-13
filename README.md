# Overview

Test website with Metamask with backend test scripts.

## Website Demo Using GitHub Pages

https://marcuswentz.github.io/Web3_Get_Set_Contract_Metamask/ 

## Web3 Programming Languages

### Recommended for web3 development:

```
Javascript (ethers.js)
Rust (alloy.rs)
Golang (Geth)
```

### Other languages:
```
C# (Nethermind)
C
Python
Typescript
C++ (Silkworm)
Nim (Nimbus)
Java (Besu)
```

### Ethereum Clients

https://clientdiversity.org/

## Backend Test Scripts 

Scripts used to control frontend and backend smart contract logic:
```
-Send Ethereum to an address
-Get value from a contract with Metamask as Web3 client provider
-Set custom uint value for a contract [negative values forced to absolute value]
```

## Testnet Smart Contract Deployments

Contract deployed and verified on Base Sepolia testnet: 

https://sepolia.basescan.org/address/0xed62f27e9e886a27510dc491f5530996719ced3d#code

## Test Frontend Website Locally

Run locally for testing with:

```shell
npm install http-server
```

then

```shell
npx http-server
```

or

```shell
http-server
```

## React Templates

This website example uses Vanilla Javascript.
Here are some links to other templates using React.

### Vite

https://github.com/MarcusWentz/react-vite-ethers-template

### Next.js

https://github.com/MarcusWentz/react-nextjs-ethers-template

## Testnet Bridges Sepolia to L2 EVM Rollups

### Base Sepolia

https://superbridge.app/base-sepolia

### Optimism Sepolia

https://superbridge.app/op-sepolia
