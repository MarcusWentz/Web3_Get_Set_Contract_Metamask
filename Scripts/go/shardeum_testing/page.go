package main

import (
   "io/ioutil"
   "log"
   "net/http"
   "encoding/json"
)

type transactionCountJson struct {
	Success bool `json:"success"`
   TotalTransactions int `json:"totalTransactions"`
}

func main() {

   resp, err := http.Get("https://explorer-sphinx.shardeum.org/api/transaction?startCycle=6928&endCycle=6928")
   if err != nil {
      log.Fatalln(err)
   }

   rawBodyBytes, err := ioutil.ReadAll(resp.Body)
   if err != nil {
      log.Fatalln(err)
   }

   log.Printf(string(rawBodyBytes))

   var transactionCountJsonInstance transactionCountJson

   err = json.Unmarshal(rawBodyBytes, &transactionCountJsonInstance)
   if err != nil {
      log.Fatalln(err)
   }

   log.Println(transactionCountJsonInstance)
   log.Println(transactionCountJsonInstance.TotalTransactions)

}