package main

import (
	"context"
    "encoding/hex"
	"fmt"
    "log"
    "os"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/ethclient"
    "github.com/ethereum/go-ethereum/common"
)

func main() {

	client, err := ethclient.Dial(os.Getenv("goerliHTTPS_InfuraAPIKey"))
    // client, err := ethclient.Dial("https://liberty20.shardeum.org")
    if err != nil {
        log.Fatal(err)
    }

    //Goerli
    tx_to := common.HexToAddress("0x326C977E6efc84E512bB9C30f76E30c160eD06FB")
    tx_data := common.FromHex("0x70a0823100000000000000000000000066C1d8A5ee726b545576A75380391835F8AAA43c")

    //Liberty 2.X
	// tx_to := common.HexToAddress("0x8f01876ccd727fd703787ed477b7f71e1e3adbb1")
    // tx_data := common.FromHex("0x8da5cb5b")

	callMsg := ethereum.CallMsg{
		To:   &tx_to,
		Data: tx_data,
	}

    fmt.Printf("callMsg: ")
    fmt.Println(callMsg)
    
	res, err := client.CallContract(context.Background(), callMsg, nil)
	if err != nil {
        log.Fatal(err)
	}

    fmt.Printf("eth_call: " + hex.EncodeToString(res) + "\n")

}