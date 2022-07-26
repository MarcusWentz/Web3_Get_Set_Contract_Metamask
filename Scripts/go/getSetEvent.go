//go run StoreTest.go Store.go
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
    client, err := ethclient.Dial(os.Getenv("rinkebyWebSocketSecureEventsInfuraAPIKey"))
    if err != nil {
        log.Fatal(err)
    }

     contractAddress := common.HexToAddress("0xaf3310ec212eCBA069149239F954F1281fDa836B")

     contract, err := NewStore(contractAddress, client)
     if err != nil {
         log.Fatal(err)
     }

     fmt.Println("contract is loaded")
     _ = contract

     storedData, err := contract.StoredData(&bind.CallOpts{})
       if err != nil {
           log.Fatal(err)
     }

     fmt.Println(storedData)

     //Set new value for smart contract uint storage slot.
     privateKey, err := crypto.HexToECDSA(os.Getenv("devTestnetPrivateKey"))
      if err != nil {
          log.Fatal(err)
      }

      publicKey := privateKey.Public()
      fmt.Println(publicKey)
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

      fmt.Println(nonce)
      fmt.Println(gasPrice)

      auth := bind.NewKeyedTransactor(privateKey)
      auth.Nonce = big.NewInt(int64(nonce))
      auth.Value = big.NewInt(0)     // in wei
      auth.GasLimit = uint64(300000) // in units
      auth.GasPrice = gasPrice

      tx, err := contract.Set(auth, big.NewInt(555))
      if err != nil {
          log.Fatal(err)
      }

      fmt.Printf("tx sent: %s", tx.Hash().Hex()) // tx sent

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
             fmt.Println(vLog) // pointer to event log
             storedData, err := contract.StoredData(&bind.CallOpts{})
               if err != nil {
                   log.Fatal(err)
             }

             fmt.Println(storedData)
         }
     }
}
