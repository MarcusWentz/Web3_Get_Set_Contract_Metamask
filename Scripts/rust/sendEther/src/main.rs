use ethers::utils::Ganache; //Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use eyre::Result;
use ethers::signers::{Signer, LocalWallet};

#[tokio::main]
async fn main() -> Result<()> {
    // Spawn a aanache instance
    let ganache = Ganache::new().spawn();
    println!("HTTP Endpoint: {}", ganache.endpoint());

    let mnemonic = "gas monster ski craft below illegal discover limit dog bundle bus artefact";
    let ganache = Ganache::new().mnemonic(mnemonic).spawn();

    // // Get the first wallet managed by ganache
    let wallet: LocalWallet = ganache.keys()[0].clone().into();
    println!("Default wallet address: {:?}", wallet);
    // let wallet_address: String = wallet.address().encode_hex();
    // println!("Default wallet address: {}", wallet_address);

    Ok(())

}
