use ethers::utils::Ganache; //Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use eyre::Result;
use ethers::signers::{Signer, LocalWallet};
use std::time::Duration;
use ethers_providers::{Middleware, Provider, Http};
use std::convert::TryFrom;
use std::env;

#[tokio::main]
async fn main() -> Result<()> {
    // Spawn a aanache instance
    // let ganache = Ganache::new().spawn();
    // println!("HTTP Endpoint: {}", ganache.endpoint());
    //
    // let mnemonic = "gas monster ski craft below illegal discover limit dog bundle bus artefact";
    // let ganache = Ganache::new().mnemonic(mnemonic).spawn();
    //
    // // // Get the first wallet managed by ganache
    // let wallet: LocalWallet = ganache.keys()[0].clone().into();
    // println!("Wallet object: {:?}", wallet);
    // let wallet_address = wallet.address();
    // let wallet_address_raw: String = "0xb5f27c716e44ffe48fd6622983c651355ad8c75a".to_string();
    // println!("Wallet address hex: {:?}", wallet_address);
    // println!("Wallet address string: {}", wallet_address_raw);

    // A provider is an Ethereum JsonRPC client
    // let provider = Provider::try_from(ganache.endpoint())?.interval(Duration::from_millis(10));
    // println!("provider: {:?}", provider);

    let rpcGoerliInfuraHTTPS = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let provider = Provider::<Http>::try_from(rpcGoerliInfuraHTTPS).expect("could not instantiate HTTP Provider");

    let block = provider.get_block(0).await?;
    println!("Got block: {:?}", block);

    // let block = provider.get_block(0).await?;
    // println!("Got block: {}", serde_json::to_string(&block)?);

    // // Query the balance of our account
    // let first_balance = provider.get_balance(wallet_address, None).await?;
    // println!("Wallet first address balance: {}", first_balance);

    let another_balance = provider.get_balance("car.eth", None).await?;
    println!("Wallet first address balance: {}", another_balance);

    Ok(())

}
