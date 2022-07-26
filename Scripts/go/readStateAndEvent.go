//go run StoreTest.go Store.go
package main

import (
    "fmt"
    "log"
    "os"
    "context"

    "github.com/ethereum/go-ethereum"
    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
    "github.com/ethereum/go-ethereum/core/types"

)

func main() {
    client, err := ethclient.Dial(os.Getenv("rinkebyWebSocketSecureEventsInfuraAPIKey"))
    if err != nil {
        log.Fatal(err)
    }

    contractAddress := common.HexToAddress("0xaf3310ec212eCBA069149239F954F1281fDa836B")
     query := ethereum.FilterQuery{
         Addresses: []common.Address{contractAddress},
     }

     logs := make(chan types.Log)
     sub, err := client.SubscribeFilterLogs(context.Background(), query, logs)
     if err != nil {
         log.Fatal(err)
     }

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
