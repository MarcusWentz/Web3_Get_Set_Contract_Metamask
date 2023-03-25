// From https://www.youtube.com/watch?v=dniVs0xKYKk
package main

import (
    "fmt"
    "log"
    "net/http"
    "github.com/gorilla/websocket"
)

func main() {

    fmt.Println("Websocket server running on:");
    fmt.Println("ws://127.0.0.1:8080/ws");
    fmt.Println("Open a terminal and run a websocket client with:");
    fmt.Println("'websocat ws://127.0.0.1:8080/ws'");
    fmt.Println("When the client connects, type something, hit enter, and the server will send the message back to the client terminal.");

    http.HandleFunc("/ws", wsEndpoint)
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {

    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
    }

    log.Println("Client connected.")
    err = ws.WriteMessage(1, []byte("Server detected a client. Server is listening for client messages..."))
    if err != nil {
        log.Println(err)
    }

    textMessagePingPong(ws)
}

func textMessagePingPong(conn *websocket.Conn) {

    fmt.Println("Waiting for new inputs from client to play ping pong with...")

    for {
        // Read input from client.
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            log.Println(err)
            return
        }
        fmt.Println("Ping " + string(p))

        // Write the same message back to client.
        returnMessage := []byte("Pong " + string(p) + "Server is listening for client messages...")
        fmt.Println(string(returnMessage))
        if err := conn.WriteMessage(messageType, returnMessage ); err != nil {
            log.Println(err)
            return
        }

    }
}

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}