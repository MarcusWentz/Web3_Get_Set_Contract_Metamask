// From https://www.youtube.com/watch?v=aVDkuViaJfY
package main

import (
    "fmt"    
    "time"
    "sync"
)

func main() {
    wg.Add(1)
    go repeatStringWordTenTimes("1")
    wg.Add(1)
    go repeatStringWordTenTimes("2")
    wg.Wait() // Wait for all go routines to finish.
}

func repeatStringWordTenTimes(stringInput string) {
    defer wg.Done() // Say the wait group is done if the whole function runs without errors.
    for i := 0; i < 2; i++ { 
        time.Sleep(100 * time.Millisecond)
        fmt.Println(stringInput)
    }
}

var wg sync.WaitGroup