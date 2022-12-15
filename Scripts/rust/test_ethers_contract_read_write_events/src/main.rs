//Contracts Rust Ethers credit: https://docs.rs/ethers-contract/0.2.2/ethers_contract/struct.Contract.html
//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use std::{convert::TryFrom};
use std::env;

use ethers_signers::{LocalWallet, Signer};
use ethers_providers::{Middleware, Provider, Http};
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

    let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let rpc_goerli_infura_wss = env::var("goerliWebSocketSecureEventsInfuraAPIKey").expect("$goerliWebSocketSecureEventsInfuraAPIKey is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");

    println!("provider {:?}:", provider);

    let signer = private_key_wallet_string.parse::<LocalWallet>()?;

    let signer_address = signer.address();
    println!("signer address: {}", signer_address);

    println!("signer {:?}:", signer);

    let block = provider.get_block(0).await?;
    println!("Got block: {:?}", block);

    let client = SignerMiddleware::new_with_provider_chain(provider, signer).await.unwrap();
    println!("client {:?}:", client);

    let _address = "dbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37".parse::<Address>()?; //0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37

    let clientArc =
    Provider::<Ws>::connect(rpc_goerli_infura_wss)
        .await?;

    let _clientArc = Arc::new(client);

    let simple_storage_instance = SimpleStorage::new(_address, Arc::clone(&_clientArc));

    let stored_data_value = simple_storage_instance.stored_data().call().await?;

    println!("storedDataValue");
    println!("{0}", stored_data_value);

    // (first `await` returns a PendingTransaction, second one waits for it to be mined)
    let tx = simple_storage_instance.set(U256::from(2222)).send().await?.await?;

    println!("Tx mined!");

    let stored_data_value = simple_storage_instance.stored_data().call().await?;
    println!("storedDataValue");
    println!("{0}", stored_data_value);

    // let tx_raw = TransactionRequest::new()
    //     .chain_id(5)
    //     .to(signer_address)
    //     .data(contract.set(U256::from(55)))
    //     .value(0)
    //     .gas(200000)
    //     .gas_price(3_000_000_000u32); //3000000000 wei = 3 Gwei
    // let tx_raw_hash = client.send_transaction(tx_raw, None).await?;
    // let _receipt_raw = tx_raw_hash.confirmations(2).await?;

    // Subscribe Transfer events
    let events = simple_storage_instance.events();
    let mut stream = events.stream().await?;

    println!("EVENT LISTENER START!");

    while let Some(Ok(event)) = stream.next().await {
        println!("EVENT DETECTED!");

        let stored_data_value = simple_storage_instance.stored_data().call().await?;
        println!("storedDataValue");
        println!("{0}", stored_data_value);
    }

    Ok(())

}
