//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
// use std::time::Duration;
use std::convert::TryFrom;
use std::env;

// use ethers::utils::Ganache;
use ethers::signers::{Wallet, Signer, LocalWallet};
use ethers_providers::{Middleware, Provider, Http};
// use ethers_core::types::Address;
use ethers_core::types::{Address,TransactionRequest,U256};

use ethers_core::rand::thread_rng;

use eyre::Result;


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

    let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    //
    // let str_addr: &str = private_key_wallet_string;
    // let addr: Address = str_addr.parse().unwrap()

    // let private_key_wallet_hex : Address = private_key_wallet_string.parse().unwrap();

    let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");

    // let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).unwrap().with_sender(addr);


    // let client = Wallet::new(private_key_wallet).connect(provider);
    // println!("client {:?}",client);
    //
    //
    // let provider = Provider::<Http>::try_from(anvil.endpoint()).unwrap().with_sender(private_key_wallet);


    let block = provider.get_block(0).await?;
    println!("Got block: {:?}", block);

    // Query the balance of our account
    let first_address_hex = "0xc1202e7d42655F23097476f6D48006fE56d38d4f";
    let first_address = "0xc1202e7d42655F23097476f6D48006fE56d38d4f".parse::<Address>()?;
    let first_balance = provider.get_balance(first_address, None).await?;
    println!("Balance for address {}: {}",first_address_hex, first_balance);

    let other_address_hex = "0x66C1d8A5ee726b545576A75380391835F8AAA43c";
    let other_address = "0x66C1d8A5ee726b545576A75380391835F8AAA43c".parse::<Address>()?;
    let other_balance = provider.get_balance(other_address, None).await?;
    println!("Balance for address {}: {}",other_address_hex, other_balance);

    let ens_balance = provider.get_balance("car.eth", None).await?;
    println!("ENS address balance: {}", ens_balance);

    let wallet = Wallet::new(&mut thread_rng());
    println!("Wallet {:?}",wallet);

    // let wallet = wallet.private_key(private_key_wallet);

    // Create a transaction to transfer 1000 wei to `other_address`
    let tx = TransactionRequest::pay(other_address, U256::from(1000u64)).from(first_address);
    // Send the transaction and wait for receipt
    let _receipt = provider.send_transaction(tx, None);
    println!("Balance for address {}: {}",first_address_hex, first_balance);
    println!("Balance for address {}: {}",other_address_hex, other_balance);

    Ok(())

}
