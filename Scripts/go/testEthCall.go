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

	client, err := ethclient.Dial(os.Getenv("mainnetHTTPS_InfuraAPIKey"))
    // client, err := ethclient.Dial("https://sphinx.shardeum.org/")
    if err != nil {
        log.Fatal(err)
    }

    //Ethereum Mainnet
    tx_to := common.HexToAddress("0xcc13fc627effd6e35d2d2706ea3c4d7396c610ea")

    //Betanet 1.X
	// tx_to := common.HexToAddress("0xA66CC96316A4dF10b96Dc3e62dAE184d04E93Ad9")

    tx_data := common.FromHex("0x8da5cb5b")

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