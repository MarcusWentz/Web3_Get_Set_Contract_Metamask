// Green threads with async/await in Rust are less expensive than thread::spawn OS threads.
// YouTube more examples and theory:
// https://www.youtube.com/watch?v=6VMJOmNBubg
// Rust documentation:
// https://tokio.rs/tokio/tutorial/spawning

#[tokio::main]
async fn main() {
    let handle = tokio::spawn(async {
        // Do some async work
        "return value"
    });

    let out = handle.await.unwrap();
    println!("GOT {}", out);
}

