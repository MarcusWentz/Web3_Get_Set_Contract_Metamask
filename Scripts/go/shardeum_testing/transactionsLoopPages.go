package main

import (
   "io/ioutil"
   "log"
   "net/http"
   "encoding/json"
   "strconv"
)

func main() {
   
   baseUrl := "https://explorer-sphinx.shardeum.org/api/transaction?startCycle=";
   transactionCount := getTransactionCount(6928, baseUrl)
   log.Println(transactionCount)

   readJsonLoop(transactionCount, baseUrl)

}

type transactionCountJson struct {
	Success bool `json:"success"`
   TotalTransactions int `json:"totalTransactions"`
}

func getTransactionCount(cycleNumber int, baseUrl string) (x int) {

   getRequestUrl := 
      baseUrl +
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

   var transactionCountJsonInstance transactionCountJson

   err = json.Unmarshal(rawBodyBytes, &transactionCountJsonInstance)
   if err != nil {
      log.Fatalln(err)
   }

   return transactionCountJsonInstance.TotalTransactions;
}

func readJsonLoop(totalTransactions int, baseUrl string) {

   total := totalTransactions;
   pageIndex := 1;

   for total > 0 {

      getRequestUrl := 
         baseUrl+
         strconv.Itoa(6928)+
         "&endCycle="+
         strconv.Itoa(6928)+
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