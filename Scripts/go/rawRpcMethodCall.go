package main

import (
	"fmt"
	"log"
    // "os"

	"github.com/ethereum/go-ethereum/rpc"
)

func main() {
    // client, err := rpc.DialHTTP(os.Getenv("goerliHTTPS_InfuraAPIKey"))
	client, err := rpc.DialHTTP("https://liberty20.shardeum.org")
	if err != nil {
		log.Fatal(err)
	}

	type request struct {
		To   string `json:"to"`
		Data string `json:"data"`
	}

	var result string

	// req := request{"0x326C977E6efc84E512bB9C30f76E30c160eD06FB", "0x70a0823100000000000000000000000066C1d8A5ee726b545576A75380391835F8AAA43c"}
	req := request{"0x8f01876ccd727fd703787ed477b7f71e1e3adbb1", "0x8da5cb5b"}
	if err := client.Call(&result, "eth_call", req, "latest"); err != nil {
		log.Fatal(err)
	}

	fmt.Printf(result + "\n")
}