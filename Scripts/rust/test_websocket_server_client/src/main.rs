#[macro_use]
extern crate may;
extern crate native_tls;
extern crate tungstenite;

use may::net::TcpListener;
use tungstenite::accept;

fn main() {

    println!("Websocket server running on:");
    println!("ws://0.0.0.0:8000");
    println!("Open a terminal and run a websocket client with:");
    println!("'websocat ws://0.0.0.0:8000'");
    println!("When the client connects, type something, hit enter, and the server will send the message back to the client terminal.");

    let listener = TcpListener::bind(("0.0.0.0", 8000)).unwrap();
    for stream in listener.incoming() {
        go!(move || {
            let mut websocket = accept(stream.unwrap()).unwrap();

            loop {
                let msg = websocket.read_message().unwrap();

                // Just echo back everything that the client sent to us
                if msg.is_binary() || msg.is_text() {
                    println!("Client sent server: {}", msg);
                    websocket.write_message("Sent the same message back to client".into()).unwrap();
                    websocket.write_message(msg).unwrap();
                }
            }
        });

    }
}