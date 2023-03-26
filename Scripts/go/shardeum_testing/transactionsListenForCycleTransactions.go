package main

import (
   "io/ioutil"
   "log"
   "net/http"
   "encoding/json"
   "context"
   "math/big"
   "strconv"
   "time"

   "github.com/ethereum/go-ethereum/ethclient"
)

func main() {

   client, chainID := clientSetup("https://sphinx.shardeum.org/")

   log.Println("chainID: ", chainID)


   for {

      header, err := client.HeaderByNumber(context.Background(), nil)
      if err != nil {
         log.Fatal(err)
      }

      blockNumber := header.Number
      bigNumberTenBundlesPerCycle, _ := new(big.Int).SetString("10", 10)  //Value 10, decimal units also 10. 
      cycleNumber := new(big.Int).Div(blockNumber, bigNumberTenBundlesPerCycle)
      bigNumberOne, _ := new(big.Int).SetString("1", 10)  //Value 1, decimal units 10. 
      cycleNumberMinusOne := new(big.Int).Sub(cycleNumber, bigNumberOne)
      log.Println(cycleNumberMinusOne)
      
      baseUrl := "https://explorer-sphinx.shardeum.org/api/transaction?startCycle=";
      transactionCount := getTransactionCount(cycleNumberMinusOne, baseUrl)
      log.Println(transactionCount)

      readJsonLoop(cycleNumberMinusOne,baseUrl,transactionCount)

      time.Sleep(60 * time.Second)

   }

}

type transactionCountJson struct {
	Success bool `json:"success"`
   TotalTransactions int `json:"totalTransactions"`
}

func getTransactionCount(cycleNumber *big.Int, baseUrl string) (x int) {

   getRequestUrl := 
      baseUrl +
      cycleNumber.String()+
      "&endCycle="+
      cycleNumber.String();
   log.Println(getRequestUrl)

   resp, err := http.Get(getRequestUrl)
   if err != nil {
      log.Fatalln(err)
   }

   rawBodyBytes, err := ioutil.ReadAll(resp.Body)
   if err != nil {
      log.Fatalln(err)
   }

   var transactionCountJsonInstance transactionCountJson

   err = json.Unmarshal(rawBodyBytes, &transactionCountJsonInstance)
   if err != nil {
      log.Fatalln(err)
   }

   return transactionCountJsonInstance.TotalTransactions;
}

func readJsonLoop(cycleNumber *big.Int, baseUrl string, totalTransactions int) {

   total := totalTransactions;
   pageIndex := 1;

   for total > 0 {

      getRequestUrl := 
         baseUrl+
         cycleNumber.String()+
         "&endCycle="+
         cycleNumber.String()+
         "&page=" + 
         strconv.Itoa(pageIndex)
      log.Println(getRequestUrl)

      resp, err := http.Get(getRequestUrl)
      if err != nil {
         log.Fatalln(err)
      }
   
      rawBodyBytes, err := ioutil.ReadAll(resp.Body)
      if err != nil {
         log.Fatalln(err)
      }
   
      log.Printf(string(rawBodyBytes))

      total -= 10;
      pageIndex++;
   }

}

func clientSetup(wssConnectionURL string) (client *ethclient.Client, chainID *big.Int) {

   client, err := ethclient.Dial(wssConnectionURL) //Also works with HTTPS connections. 
   if err != nil {
       log.Fatal(err)
   }
 
   chainID, err = client.NetworkID(context.Background())
   if err != nil {
      log.Fatal(err)
   }
   return
 }