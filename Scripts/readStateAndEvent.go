//go run StoreTest.go Store.go
package main

import (
    "fmt"
    "log"
    "os"

    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
)

func main() {
    client, err := ethclient.Dial(os.Getenv("rinkebyWebSocketSecureEventsInfuraAPIKey"))
    if err != nil {
        log.Fatal(err)
    }

    contract, err := NewStore(common.HexToAddress("0xaf3310ec212ecba069149239f954f1281fda836b"), client)
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
}
