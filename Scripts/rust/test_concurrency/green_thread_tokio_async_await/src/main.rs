// Green threads with async/await in Rust are less expensive than thread::spawn OS threads.
// YouTube more examples and theory:
// https://www.youtube.com/watch?v=6VMJOmNBubg
// Rust documentation:
// https://tokio.rs/tokio/tutorial/spawning

use std::time::Duration;

#[tokio::main]
async fn main() {
    // let handle = tokio::spawn(async {
    //     // Do some async work
    //     "return value"
    // });

    // let out = handle.await.unwrap();
    // println!("GOT {}", out);

    // spawned thread.
    let handle = tokio::spawn(async {
        for i in 1..10 {
            println!("hi number {i} from the spawned task!");
            tokio::time::sleep(Duration::from_millis(1)).await;
        }
    });

    // // main thread waits for the spawned thread to execute first if join is called before it.
    // // std thread:
    // handle.join().unwrap();
    // // tokio thread:
    // handle.await.unwrap();

    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        tokio::time::sleep(Duration::from_millis(1)).await;
    }

    // main thread will not wait for the spawned thread to execute first if join is called after it.
    // // std thread:
    // handle.join().unwrap();
    // tokio thread:
    handle.await.unwrap();

}

