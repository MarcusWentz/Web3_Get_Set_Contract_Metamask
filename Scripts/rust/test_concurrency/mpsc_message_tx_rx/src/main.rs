// MPSC (Multi Producer Single Consumer) enables messaging between threads with TX and RX logic.
// You can have multiple messagers, but all messagers must converge to a single consumer with MPSC.
// This is safer than using Mutex, since we are not sharing the memory state because we are using messaging instead.
// Mutex is used if state modification is a desired feature 
// (even though Mutex has security risks when not implemented correctly).

// YouTube lecture:
// https://www.youtube.com/watch?v=ePY5GA9R-UY
// YouTube example:
// https://www.youtube.com/watch?v=0P6XfhM5PRA
// Rust documentation:
// https://doc.rust-lang.org/book/ch16-02-message-passing.html

use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("test");
        tx.send(val).unwrap();
    });

    // For MPSC, rx acts as join for handling joining threads.
    let received = rx.recv().unwrap();
    println!("Got: {received}");
}