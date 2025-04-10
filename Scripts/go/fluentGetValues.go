//Step 1: Install Geth to get abigen
// https://guides.quicknode.com/guides/infrastructure/node-setup/how-to-install-and-run-a-geth-node#installing-geth
//Step 2: Create abi file by running: 
// solc --abi Store.sol > store.abi
//Step 3: Create bin file by running: 
// solc --bin Store.sol > store.bin
//Step 4: Remove comments above the abi and bin files.
//Step 5: Generate Go contract interaction file by running:  
// abigen --bin=fluent.bin --abi=fluent.abi --pkg=fluent --out=fluent.go
//Step 6: Run: 
// go run fluentGetValues.go
package main

import (
    "fmt"
    "log"
    "context"
    "math/big"

    fluent "storeProject/contracts/fluent" //LOOK AT "go.mod" FOR YOUR RELATIVE PROJECT PATH TO FIND CONTRACT INTERFACE!

    // "github.com/ethereum/go-ethereum"
    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
    // "github.com/ethereum/go-ethereum/core/types"
    // "github.com/ethereum/go-ethereum/crypto"
)

func main() {

    // Use this endpoint when you are running your own node on a specific chain (no events)
    // client, chainID := clientSetup("http://localhost:8545")

    // Use this endpoint when you are running your own node on a specific chain (events allowed)
    // client, chainID := clientSetup("ws://localhost:8546")

    client, chainID := clientSetup("wss://rpc.dev.gblend.xyz/ws")
    // client, chainID := clientSetup(os.Getenv("sepoliaInfuraWSS"))

    fmt.Println("chainID: ", chainID)

    baseSepoliaChainId := big.NewInt(20993);

    // fmt.Println("baseSepoliaChainId: ", baseSepoliaChainId)

    // // WE CAN'T COMPARE TYPE *big.Int VALUES DIRECTLY! NEED TO USE A HELPER METHOD.
    // fmt.Println(baseSepoliaChainId == chainID)

    // https://stackoverflow.com/a/44697073
    isClientChainIdCorrect := baseSepoliaChainId.Cmp(chainID) == 0;

    if isClientChainIdCorrect == false {
        fmt.Printf("RPC endpoint not connected to Fluent Sepolia (chainId: %s)\n", baseSepoliaChainId)
        log.Fatal("Switch to Fluent Sepolia then try again.",  )
     }

    contractAddress := common.HexToAddress("0xd810284B98f41681477D89888Ce81f1b63690568")
    contract := connectContractAddress(client,contractAddress)
    fmt.Println("contract type object: ")
    fmt.Printf("%T",contract)
    fmt.Println("")

    storedData := getstoredData(contract)
    fmt.Println("storedData:", storedData)
    
}

func clientSetup(wssConnectionURL string) (client *ethclient.Client, chainID *big.Int) {

  client, err := ethclient.Dial(wssConnectionURL)
  if err != nil {
      log.Fatal(err)
  }

  chainID, err = client.NetworkID(context.Background())
  if err != nil {
     log.Fatal(err)
  }
  return
}

func connectContractAddress(client *ethclient.Client, contractAddress common.Address) (contract *fluent.Fluent) {

  contract, err := fluent.NewFluent(contractAddress, client)
  if err != nil {
      log.Fatal(err)
  }
  return
}

func getstoredData(contract *fluent.Fluent) (storedData *big.Int) {

  storedData, err := contract.GetRustUint256(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}

