//Step 1: Create abi file by running: solc --abi Store.sol > store.abi
//Step 2: Create bin file by running: solc --bin Store.sol > store.bin
//Step 3: Remove comments above the abi and bin files.
//Step 4: Generate Go contract interaction file by running:  abigen --bin=store.bin --abi=store.abi --pkg=store --out=store.go
//Step 5: Run: getSetEvent.go
package main

import (
    "fmt"
    "log"
    "os"
    "context"
    "crypto/ecdsa"
    "math/big"
    "golang.org/x/crypto/sha3"

    store "storeProject/contracts" //LOOK AT "go.mod" FOR YOUR RELATIVE PROJECT PATH TO FIND CONTRACT INTERFACE!

    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
    "github.com/ethereum/go-ethereum/core/types"
    "github.com/ethereum/go-ethereum/crypto"
    "github.com/ethereum/go-ethereum/common/hexutil"
)

func main() {

     // Use this endpoint when you are running your own node on a specific chain (no events)
     // client, chainID := clientSetup("http://localhost:8545")

     // Use this endpoint when you are running your own node on a specific chain (events allowed)
     // client, chainID := clientSetup("ws://localhost:8546")

     client, chainID := clientSetup(os.Getenv("goerliWebSocketSecureEventsInfuraAPIKey"))

     fmt.Println("chainID: ", chainID)

     contractAddress := common.HexToAddress("0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37")
     contract := connectContractAddress(client,contractAddress)
     fmt.Println("contract type object: ")
     fmt.Printf("%T",contract)
     fmt.Println("")

     auth, fromAddress := connectWallet(os.Getenv("devTestnetPrivateKey"),client,chainID)

     storedData := getstoredData(contract)
     fmt.Println("storedData:", storedData)

     setUintValue := big.NewInt(444)
     SetStoredDataTx(setUintValue,client,auth,fromAddress,contract);
     
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

func connectContractAddress(client *ethclient.Client, contractAddress common.Address) (contract *store.Store) {

  contract, err := store.NewStore(contractAddress, client)
  if err != nil {
      log.Fatal(err)
  }
  return
}

func connectWallet(privateKeyString string, client *ethclient.Client, chainID *big.Int) (auth *bind.TransactOpts, fromAddress common.Address) {

   privateKey, err := crypto.HexToECDSA(privateKeyString)
   if err != nil {
       log.Fatal(err)
   }

   publicKey := privateKey.Public()
   publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
   if !ok {
       log.Fatal("error casting public key to ECDSA")
   }

   fromAddress = crypto.PubkeyToAddress(*publicKeyECDSA)

   auth, err = bind.NewKeyedTransactorWithChainID(privateKey, chainID)
   if err != nil {
       log.Fatal(err)
   }

   return

}

func getstoredData(contract *store.Store) (storedData *big.Int) {

  storedData, err := contract.StoredData(&bind.CallOpts{})
  if err != nil {
        log.Fatal(err)
  }
  return

}

func SetStoredDataTx(setUintValue *big.Int, client *ethclient.Client, auth *bind.TransactOpts, fromAddress common.Address, contract *store.Store) {

  gasPrice, err := client.SuggestGasPrice(context.Background())
  if err != nil {
      log.Fatal(err)
  }

  nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
  if err != nil {
      log.Fatal(err)
  }

  auth.Nonce = big.NewInt(int64(nonce))
  // auth.GasLimit = uint64(3000000) // in units
  gasLimit := uint64(3000000) // in units
  auth.GasPrice = gasPrice
  // auth.Value = big.NewInt(0)     // in wei
   value := big.NewInt(0)     // in wei

   methodToCall := []byte("set(uint256)")
   hash := sha3.NewLegacyKeccak256()
   hash.Write(methodToCall)
   methodID := hash.Sum(nil)[:4]
   fmt.Println(hexutil.Encode(methodID)) // 0xa9059cbb

   amount := new(big.Int)
   amount.SetString("777", 10) // 1000 tokens
   paddedAmount := common.LeftPadBytes(amount.Bytes(), 32)
   fmt.Println(hexutil.Encode(paddedAmount)) // 0x00000000000000000000000000000000000000000000003635c9adc5dea00000

   var data []byte
   data = append(data, methodID...)
   data = append(data, paddedAmount...)

   tx := types.NewTransaction(nonce, common.HexToAddress("0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37"), value, gasLimit, gasPrice, data)

   privateKey, err := crypto.HexToECDSA(os.Getenv("devTestnetPrivateKey"))

   chainID, err := client.NetworkID(context.Background())
   if err != nil {
       log.Fatal(err)
   }

   signedTx, err := types.SignTx(tx, types.NewEIP155Signer(chainID), privateKey)
   if err != nil {
       log.Fatal(err)
   }

   err = client.SendTransaction(context.Background(), signedTx)
   if err != nil {
       log.Fatal(err)
   }

   fmt.Printf("tx sent: %s", signedTx.Hash().Hex()) // tx sent: 0xa56316b637a94c4cc0331c73ef26389d6c097506d581073f927275e7a6ece0bc

  return
}

