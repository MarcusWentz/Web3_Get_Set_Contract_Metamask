package main

import (
   "io/ioutil"
   "log"
   "net/http"
)

func main() {

   resp, err := http.Get("https://jsonplaceholder.typicode.com/posts")
   if err != nil {
      log.Fatalln(err)
   }

   rawBodyBytes, err := ioutil.ReadAll(resp.Body)
   if err != nil {
      log.Fatalln(err)
   }

   log.Printf(string(rawBodyBytes))
}