// OS threads from thread::spawn are simple, but are more expensive than green threads with async/await in Rust.
// YouTube:
// https://www.youtube.com/watch?v=6VMJOmNBubg
// Rust documentation:
// https://doc.rust-lang.org/book/ch16-01-threads.html

use std::thread;
use std::time::Duration;

fn main() {

    // spawned thread.
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
    });

    // // main thread waits for the spawned thread to execute first if join is called before it.
    // handle.join().unwrap();

    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        thread::sleep(Duration::from_millis(1));
    }

    // main thread will not wait for the spawned thread to execute first if join is called after it.
    handle.join().unwrap();

    // Note: if join is not called, main thread can end program execution even if spawned thread did not finish its for loop execution.

}