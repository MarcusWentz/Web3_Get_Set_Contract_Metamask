package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/ethereum/go-ethereum"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/core/types"
    "github.com/ethereum/go-ethereum/ethclient"
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

    for {
        select {
        case err := <-sub.Err():
            log.Fatal(err)
        case vLog := <-logs:
            fmt.Println(vLog) // pointer to event log
        }
    }
}
