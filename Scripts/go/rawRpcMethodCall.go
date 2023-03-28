package main

import (
	"fmt"
	"log"
    "os"

	"github.com/ethereum/go-ethereum/rpc"
)

func main() {
	client, err := rpc.DialHTTP(os.Getenv("mainnetHTTPS_InfuraAPIKey"))
	// client, err := rpc.DialHTTP("https://sphinx.shardeum.org/")
	if err != nil {
		log.Fatal(err)
	}

	type request struct {
		To   string `json:"to"`
		Data string `json:"data"`
	}

	var result string

	req := request{"0xcc13fc627effd6e35d2d2706ea3c4d7396c610ea", "0x8da5cb5b"}
	// req := request{"0xA66CC96316A4dF10b96Dc3e62dAE184d04E93Ad9", "0x8da5cb5b"}
	if err := client.Call(&result, "eth_call", req, "latest"); err != nil {
		log.Fatal(err)
	}

	fmt.Printf(result + "\n")
}