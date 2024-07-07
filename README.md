Test website with Metamask which also has some sample contracts and interaction scripts

```
Javascript
Golang
Rust
C#
Python
Nim
Java
Typescript
```

Scripts used to control frontend and backend smart contract logic:
```
-Send Ethereum to an address
-Get value from a contract with Metamask as Web3 client provider
-Set custom uint value for a contract [negative values forced to absolute value]
```
Try the project via GitHub pages:\
https://marcuswentz.github.io/Web3_Get_Set_Contract_Metamask/ \
Try the project via IPFS [deployed using Fleek]:\
https://aged-cake-4557.on.fleek.co/ 

Contract deployed and verified on Base Sepolia testnet: 

https://sepolia.basescan.org/address/0xed62f27e9e886a27510dc491f5530996719ced3d#code

Run locally for testing with:

⚠️ Node.js version v16.14.2 is recommended to avoid errors running the website locally. ⚠️
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
Note: this website example uses Vanilla Javascript.

For a similar template in React with GitHub pages support as well:

https://github.com/MarcusWentz/react-ethers-template
