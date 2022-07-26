//Step 1: Create abi and bin files.
//Step 2: Generate Go contract interaction file by running:  abigen --bin=Store_sol_Store.bin --abi=Store_sol_Store.abi --pkg=main --out=Store.g
//Step 3: Run: StoreTest.go Store.go
package main

import (
    "fmt"
    "log"
    "os"
    "context"
    "crypto/ecdsa"
    "math/big"

    "github.com/ethereum/go-ethereum"
    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
    "github.com/ethereum/go-ethereum/core/types"
    "github.com/ethereum/go-ethereum/crypto"
)

func main() {
    //Get smart contract starting state.
    client, err := ethclient.Dial(os.Getenv("goerliWebSocketSecureEventsInfuraAPIKey"))
    if err != nil {
        log.Fatal(err)
    }

     contractAddress := common.HexToAddress("0x8bAC6b3B0E8989496b0Fa7C242d52908AeeDcC36")

     contract, err := NewMain(contractAddress, client)
     if err != nil {
         log.Fatal(err)
     }

     fmt.Println("contract is loaded")
     _ = contract

     storedData, err := contract.StoredData(&bind.CallOpts{})
       if err != nil {
           log.Fatal(err)
     }

     fmt.Println("storedData:", storedData)

     //Set new value for smart contract uint storage slot.
     privateKey, err := crypto.HexToECDSA(os.Getenv("devTestnetPrivateKey"))
      if err != nil {
          log.Fatal(err)
      }

      publicKey := privateKey.Public()
      publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
      if !ok {
          log.Fatal("error casting public key to ECDSA")
      }

      fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)
      nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
      if err != nil {
          log.Fatal(err)
      }

      gasPrice, err := client.SuggestGasPrice(context.Background())
      if err != nil {
          log.Fatal(err)
      }

      auth := bind.NewKeyedTransactor(privateKey)
      auth.Nonce = big.NewInt(int64(nonce))
      auth.Value = big.NewInt(0)     // in wei
      auth.GasLimit = uint64(300000) // in units
      auth.GasPrice = gasPrice

      setUintValue := big.NewInt(555555)
      tx, err := contract.Set(auth, setUintValue)
      if err != nil {
          log.Fatal(err)
      }

      fmt.Println("Tx hash:", tx.Hash().Hex()) // tx sent

     //Subscribe to events from smart contract address.
     query := ethereum.FilterQuery{
         Addresses: []common.Address{contractAddress},
     }

     logs := make(chan types.Log)
     sub, err := client.SubscribeFilterLogs(context.Background(), query, logs)
     if err != nil {
         log.Fatal(err)
     }

     for {
         select {
         case err := <-sub.Err():
             log.Fatal(err)
         case vLog := <-logs:
             fmt.Println("New Event Log:", vLog) // pointer to event log
             storedData, err := contract.StoredData(&bind.CallOpts{})
               if err != nil {
                   log.Fatal(err)
             }

             fmt.Println("storedData:", storedData)
         }
     }
}
