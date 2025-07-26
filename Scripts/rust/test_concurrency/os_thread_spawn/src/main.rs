use std::thread;
use std::time::Duration;

// OS threads from thread::spawn are simple, but are more expensive than green threads with async/await in Rust.
// Example from:
// https://doc.rust-lang.org/book/ch16-01-threads.html
fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        thread::sleep(Duration::from_millis(1));
    }
}