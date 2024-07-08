use std::env;
//use std::time::{SystemTime};

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

abigen!(SimpleStorage, "storeAbiBytecode.json",); // Generate the type-safe contract bindings by providing the ABI and Bytecode in the same JSON file.

use rust_gpiozero::*;
//use std::thread::sleep;
//use std::time::Duration;

#[tokio::main]
async fn main() -> Result<()> {

    // let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let rpc_goerli_infura_wss = env::var("goerliWebSocketSecureEventsInfuraAPIKey").expect("$goerliWebSocketSecureEventsInfuraAPIKey is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let provider = Provider::<Ws>::connect(rpc_goerli_infura_wss).await?;

    let signer = private_key_wallet_string.parse::<LocalWallet>()?;

    let client = SignerMiddleware::new_with_provider_chain(provider, signer).await.unwrap();

    let contract_address = "0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37".parse::<Address>()?; //0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37

    let client_arc = Arc::new(client.clone());

    let simple_storage_instance = SimpleStorage::new(contract_address, Arc::clone(&client_arc)); //Contracts Rust Ethers credit: https://docs.rs/ethers-contract/0.2.2/ethers_contract/struct.Contract.html

    let stored_data_value = simple_storage_instance.stored_data().call().await?;

    let led = LED::new(27);

    println!("storedDataValue: {0}", stored_data_value);


    update_gpio_states(
        &led,
	stored_data_value
    );

    subscribe_to_contact_events(
	&led,
        simple_storage_instance.clone()
    ).await.expect("Event function error."); //Clone the value to avoid Rust borrow checker error.


    Ok(())

}


async fn subscribe_to_contact_events(
    led : &rust_gpiozero::LED,
    simple_storage_instance_event: simple_storage::SimpleStorage<SignerMiddleware<ethers_providers::Provider<ethers_providers::Ws>, Wallet<ethers_core::k256::ecdsa::SigningKey>>>) -> Result<()> {

    let events = simple_storage_instance_event.events();
    let mut stream = events.stream().await?;

    println!("EVENT LISTENER START!");
    println!("LISTEN FOR NEW EVENTS...");

    while let Some(Ok(_event)) = stream.next().await {

        println!("EVENT DETECTED!");

        let stored_data_value = simple_storage_instance_event.stored_data().call().await?;
        println!("storedDataValue: {0}", stored_data_value);

	update_gpio_states(
	    led,
            stored_data_value
        );
   
        println!("LISTEN FOR NEW EVENTS...");

    }

    Ok(())

}

fn update_gpio_states(

    led: &rust_gpiozero::LED,
    stored_data_value: U256) {

    if stored_data_value == U256::from(0) {
       led.off();
       println!("OFF!");
    } else {
       led.on();
       println!("ON!");	
    }
	
}

