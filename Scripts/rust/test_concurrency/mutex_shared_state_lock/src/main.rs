// Mutex (mutual exclusion) allows threads to share state directly with lock and unlock logic
// instead of messaging with mpsc for example.

// WARNING: SHARING STATE HAS RISK IF NOT MANAGED CORRECTLY! MESSAGING WITH MPSC IS SAFER WITH TX AND RX LOGIC.
// EXAMPLE RISKS: DEADLOCKS, RACE CONDITIONS AND MUTEX POISONING.
// NOTE: While Rust guarantees memory safety and prevents data races at compile time, 
// logic level concurrency issues can still occur.

// YouTube Example:
// https://www.youtube.com/watch?v=dGjuAFxvXnU

// Rust documentation:
// https://doc.rust-lang.org/book/ch16-03-shared-state.html

use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result MUTEX: {}", *counter.lock().unwrap());
}

