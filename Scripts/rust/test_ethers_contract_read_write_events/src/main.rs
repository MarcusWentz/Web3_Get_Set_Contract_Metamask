//Contracts Rust Ethers credit: https://docs.rs/ethers-contract/0.2.2/ethers_contract/struct.Contract.html
//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
// use std::{convert::TryFrom};
use std::env;
use std::time::{SystemTime};

use ethers_signers::{LocalWallet, Signer};
// use ethers_providers::{Middleware, Provider, Http};
// use ethers_providers::{Provider, Http};
use ethers_providers::{Provider};
use ethers_core::types::{Address};
use ethers_middleware::SignerMiddleware;
use std::sync::Arc;

use ethers::{
    prelude::*,
};

use eyre::Result;

// Generate the type-safe contract bindings by providing the ABI and Bytecode in the same JSON file.
abigen!(SimpleStorage, "storeAbiBytecode.json",);

#[tokio::main]
async fn main() -> Result<()> {

    // let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let _rpc_goerli_infura_wss = env::var("goerliWebSocketSecureEventsInfuraAPIKey").expect("$goerliWebSocketSecureEventsInfuraAPIKey is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    // let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");
    let provider = Provider::<Ws>::connect(_rpc_goerli_infura_wss).await?;

    // println!("provider {:?}:", provider);

    let signer = private_key_wallet_string.parse::<LocalWallet>()?;

    let _signer_address = signer.address();
    // println!("signer address: {}", signer_address);

    // println!("signer {:?}:", signer);

    // let block = provider.get_block(0).await?;
    // println!("Got block: {:?}", block);

    let client = SignerMiddleware::new_with_provider_chain(provider, signer).await.unwrap();
    // println!("client {:?}:", client);

    let _address = "dbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37".parse::<Address>()?; //0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37

    let _client_arc = Arc::new(client);

    let simple_storage_instance = SimpleStorage::new(_address, Arc::clone(&_client_arc));

    let stored_data_value = simple_storage_instance.stored_data().call().await?;

    println!("storedDataValue: {0}", stored_data_value);

    let now = SystemTime::now(); //Credit: https://stackoverflow.com/questions/55849295/field-tv-sec-doesnt-exist-in-struct-systemtime
    let now_str = format!("{:?}",now); //SystemTime { tv_sec: 1657846097, tv_nsec: 129747070 }
    let now_str_digits_spaces: String = now_str.chars().filter(|c| c.is_digit(10) || *c == ',').collect(); //"1657846097,129747070"
    let now_splitted: Vec<&str> = now_str_digits_spaces.split(",").collect(); //["1657846097", "129747070"]
    let tv_sec:usize =  now_splitted[0].parse().unwrap(); //1657846097
    println!("Unix Time Now: {:?}", tv_sec);

    // Send smart contract data transaction with custom MSG.VALUE and gas parameters.
    let _tx = simple_storage_instance.set(U256::from(tv_sec))
                .value(0)
                .gas(200000)
                .gas_price(3_000_000_000u32)
                .send().await?.await?;

    println!("Tx mined.");

    // Good for transactions that don't have data.
    // let tx_raw = TransactionRequest::new()
    //     .chain_id(5)
    //     .to(_address)
    //     .value(0)
    //     .gas(200000)
    //     .gas_price(3_000_000_000u32); //3000000000 wei = 3 Gwei
    // let tx_raw_hash = client.send_transaction(tx_raw, None).await?;
    // let _receipt_raw = tx_raw_hash.confirmations(2).await?;

    let stored_data_value = simple_storage_instance.stored_data().call().await?;
    println!("storedDataValue: {0}", stored_data_value);

    // Subscribe Transfer events
    let events = simple_storage_instance.events();
    let mut stream = events.stream().await?;

    println!("EVENT LISTENER START!");

    while let Some(Ok(_event)) = stream.next().await {

        println!("EVENT DETECTED!");

        let stored_data_value = simple_storage_instance.stored_data().call().await?;
        println!("storedDataValue: {0}", stored_data_value);

    }

    Ok(())

}
