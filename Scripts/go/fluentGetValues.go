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
    "encoding/hex"

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

    fluent_rust_contract_address := getFluentRustContractAddress(contract)
    fmt.Println("fluent_rust_contract_address:", fluent_rust_contract_address)

    get_rust_string := getRustString(contract)
    fmt.Println("get_rust_string:", get_rust_string)

    get_rust_uint256 := getRustUint256(contract)
    fmt.Println("get_rust_uint256:", get_rust_uint256)

    get_rust_int256 := getRustInt256(contract)
    fmt.Println("get_rust_int256:", get_rust_int256)

    get_rust_address := getRustAddress(contract)
    fmt.Println("get_rust_address:", get_rust_address)

    get_rust_bytes_array := getRustBytes(contract)
    get_rust_bytes_hex_string := "0x" + hex.EncodeToString(get_rust_bytes_array) // bytes array to hex string
    fmt.Println("get_rust_bytes: ", get_rust_bytes_hex_string)

    get_rust_bytes32_array := getRustBytes32(contract)
    get_rust_bytes32_hex_string := "0x" + hex.EncodeToString(get_rust_bytes32_array[:]) // bytes array to hex string
    fmt.Println("get_rust_bytes32_hex_string: ", get_rust_bytes32_hex_string)

    get_rust_bool := getRustBool(contract)
    fmt.Println("get_rust_bool:", get_rust_bool)
    
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

func getRustUint256(contract *fluent.Fluent) (storedData *big.Int) {

  storedData, err := contract.GetRustUint256(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}

func getRustInt256(contract *fluent.Fluent) (storedData *big.Int) {

  storedData, err := contract.GetRustInt256(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}

func getRustBool(contract *fluent.Fluent) (storedData bool) {

  storedData, err := contract.GetRustBool(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}

func getFluentRustContractAddress(contract *fluent.Fluent) (storedData common.Address) {

  storedData, err := contract.FluentRust(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}

func getRustString(contract *fluent.Fluent) (storedData string) {

  storedData, err := contract.GetRustString(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}

func getRustAddress(contract *fluent.Fluent) (storedData common.Address) {

  storedData, err := contract.GetRustAddress(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}

func getRustBytes(contract *fluent.Fluent) (storedData []byte) {

  storedData, err := contract.GetRustBytes(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}

func getRustBytes32(contract *fluent.Fluent) (storedData [32]byte) {

  storedData, err := contract.GetRustBytes32(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}