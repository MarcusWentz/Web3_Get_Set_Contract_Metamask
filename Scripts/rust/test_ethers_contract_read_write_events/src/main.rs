use std::env;
use std::time::{SystemTime};

use ethers_signers::{LocalWallet};
// use ethers_core::types::transaction::eip2930::{AccessList,AccessListItem};
use ethers_providers::{Provider};
use ethers_core::types::{Address};
use ethers_middleware::SignerMiddleware;
// use ethers::utils::parse_units;
use std::sync::Arc;
//
use ethers::{
    prelude::*,
};

use eyre::Result;

// use futures::{executor, future, FutureExt}; // 0.3.5
use futures::{future, FutureExt}; // 0.3.5

abigen!(SimpleStorage, "storeAbiBytecode.json",); // Generate the type-safe contract bindings by providing the ABI and Bytecode in the same JSON file.

#[tokio::main]
async fn main() -> Result<()> {

    // let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let rpc_sepolia_infura_wss = env::var("sepoliaInfuraWSS").expect("$sepoliaInfuraWSS is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let provider = Provider::<Ws>::connect(rpc_sepolia_infura_wss).await?;

    let signer = private_key_wallet_string.parse::<LocalWallet>()?;

    let client = SignerMiddleware::new_with_provider_chain(provider, signer).await.unwrap();

    let contract_address = "0xBBE97Afb978E19033e0BDa692E6034F5b3B91312".parse::<Address>()?; //0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37

    let client_arc = Arc::new(client.clone());

    let simple_storage_instance = SimpleStorage::new(contract_address, Arc::clone(&client_arc)); //Contracts Rust Ethers credit: https://docs.rs/ethers-contract/0.2.2/ethers_contract/struct.Contract.html

    let stored_data_value = simple_storage_instance.stored_data().call().await?;

    println!("storedDataValue before transaction: {0}", stored_data_value);

    //Will wait for one async await function at a time.
    // send_set_tx(
    //     // client.clone(),
    //     simple_storage_instance.clone()
    // ).await.expect("Transaction function error"); //Clone the value to avoid Rust borrow checker error.

    // subscribe_to_contact_events(
    //     simple_storage_instance.clone()
    // ).await.expect("Event function error."); //Clone the value to avoid Rust borrow checker error.

    //Will run both async await functions at the same time.

    let listen_for_events = 
        subscribe_to_contact_events(
            simple_storage_instance.clone()
        );

    let send_transaction_for_event = 
        send_set_tx(
            // client.clone(),
            simple_storage_instance.clone()
        );

    //How to execute multiple async functions at once and get the results
    //https://stackoverflow.com/questions/63463579/how-to-execute-multiple-async-functions-at-once-and-get-the-results

    let futures = vec![ 
        listen_for_events.boxed(),     
        send_transaction_for_event.boxed()
    ];

    let _results = future::join_all(futures).await;

    Ok(())

}

async fn send_set_tx(
    // client_tx: SignerMiddleware<ethers_providers::Provider<ethers_providers::Ws>, ethers_signers::Wallet<ethers_core::k256::ecdsa::SigningKey>>,
    simple_storage_instance: simple_storage::SimpleStorage<SignerMiddleware<ethers_providers::Provider<ethers_providers::Ws>, Wallet<ethers_core::k256::ecdsa::SigningKey>>>
    ) -> Result<()> 
{
    let tv_sec = get_unix_time();

    let tx = simple_storage_instance.set(U256::from(tv_sec)).send().await?.await?; //Will compute the gas limit opcodes automatically and get the oracle gas price per gas unit.

    // let tx = simple_storage_instance.
    //     set(
    //         U256::from(tv_sec))
    //     .value(0)
    //     .gas_price(parse_units("200", "gwei").unwrap())
    // .send().await?.await?; 

    println!("simple_storage_instance_tx.set(U256::from(tv_sec)) tx hash: {:?}", tx.unwrap().transaction_hash);

    // println!("Transaction data for simple_storage_instance_tx.set(U256::from(tv_sec)).calldata().unwrap(): {:?}", simple_storage_instance_tx.set(U256::from(tv_sec)).calldata().unwrap() );

    // println!("accessList storage slot 0 value H256: {:?}", H256::zero() );

    // let tx_raw = TransactionRequest::new()
    //     .chain_id(5)
    //     .to(simple_storage_instance_tx.address())
    //     .data(simple_storage_instance.set(U256::from(tv_sec)).calldata().unwrap())
    //     .value(0)
    //     .gas(200000)
    //     .gas_price(3_000_000_000u32) //3000000000 wei = 3 Gwei
    //     .with_access_list(AccessList(vec![
    //         AccessListItem { 
    //             address: simple_storage_instance_tx.address(), 
    //             storage_keys: vec![
    //                 // H256::zero() //Same as //"0x0000000000000000000000000000000000000000000000000000000000000000"
    //                 // H256([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    //                 "0x0000000000000000000000000000000000000000000000000000000000000000".parse::<H256>().unwrap()
    //             ] 
    //         }
    //     ] ) ); 
    
    // let tx_sent = client_tx.send_transaction(tx_raw, None).await?;
    // println!("tx sent hash: {:?}", tx_sent.tx_hash());
    
    // let _receipt_raw = tx_raw_hash.confirmations(2).await?; //This example uses an event listener, so it is not needed to have block confirmations
    // println!("Tx mined.");

    let stored_data_value = simple_storage_instance.stored_data().call().await?;

    println!("storedDataValue after transaction: {0}", stored_data_value);

    Ok(())

}

async fn subscribe_to_contact_events(simple_storage_instance_event: simple_storage::SimpleStorage<SignerMiddleware<ethers_providers::Provider<ethers_providers::Ws>, Wallet<ethers_core::k256::ecdsa::SigningKey>>>) -> Result<()> {

    let events = simple_storage_instance_event.events();
    let mut stream = events.stream().await?;

    println!("EVENT LISTENER START!");
    println!("LISTEN FOR NEW EVENTS...");

    while let Some(Ok(_event)) = stream.next().await {

        println!("EVENT DETECTED!");

        let stored_data_value = simple_storage_instance_event.stored_data().call().await?;
        println!("storedDataValue: {0}", stored_data_value);

        println!("LISTEN FOR NEW EVENTS...");

    }

    Ok(())

}

fn get_unix_time() -> usize {

    let now = SystemTime::now(); //Credit: https://stackoverflow.com/questions/55849295/field-tv-sec-doesnt-exist-in-struct-systemtime
    let now_str = format!("{:?}",now); //SystemTime { tv_sec: 1657846097, tv_nsec: 129747070 }
    let now_str_digits_spaces: String = now_str.chars().filter(|c| c.is_digit(10) || *c == ',').collect(); //"1657846097,129747070"
    let now_splitted: Vec<&str> = now_str_digits_spaces.split(",").collect(); //["1657846097", "129747070"]
    let tv_sec:usize =  now_splitted[0].parse().unwrap(); //1657846097
    println!("Unix Time Now: {:?}", tv_sec);
    return tv_sec;
}