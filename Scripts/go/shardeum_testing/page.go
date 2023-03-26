package main

import (
   "io/ioutil"
   "log"
   "net/http"
   "encoding/json"
   "strconv"
)

type transactionCountJson struct {
	Success bool `json:"success"`
   TotalTransactions int `json:"totalTransactions"`
}

func main() {
   transactionCount := gettransactionCount(6928)
   log.Println(transactionCount)
}

func gettransactionCount(cycleNumber int) (x int) {

   getRequestUrl := 
      "https://explorer-sphinx.shardeum.org/api/transaction?startCycle="+
      strconv.Itoa(cycleNumber)+
      "&endCycle="+
      strconv.Itoa(cycleNumber);
   log.Println(getRequestUrl)

   resp, err := http.Get(getRequestUrl)
   if err != nil {
      log.Fatalln(err)
   }

   rawBodyBytes, err := ioutil.ReadAll(resp.Body)
   if err != nil {
      log.Fatalln(err)
   }

   // log.Printf(string(rawBodyBytes))

   var transactionCountJsonInstance transactionCountJson

   err = json.Unmarshal(rawBodyBytes, &transactionCountJsonInstance)
   if err != nil {
      log.Fatalln(err)
   }

   // log.Println(transactionCountJsonInstance)
   // log.Println(transactionCountJsonInstance.TotalTransactions)
   return transactionCountJsonInstance.TotalTransactions;
}