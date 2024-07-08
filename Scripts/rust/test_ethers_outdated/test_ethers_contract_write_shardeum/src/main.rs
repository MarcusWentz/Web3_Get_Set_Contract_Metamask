use std::env;
use std::time::{SystemTime};
use std::time::Duration;
use std::thread::sleep;

use ethers_signers::{LocalWallet};
use ethers_core::types::transaction::eip2930::{AccessList,AccessListItem};
use ethers_providers::{Provider};
use ethers_core::types::{Address};
use ethers_middleware::SignerMiddleware;
use std::sync::Arc;

use ethers::{
    prelude::*,
};

use eyre::Result;

abigen!(SimpleStorage, "storeAbiBytecode.json",); // Generate the type-safe contract bindings by providing the ABI and Bytecode in the same JSON file.

#[tokio::main]
async fn main() -> Result<()> {

    let rpc_shardeum_https = env::var("shardeumHttpRpc").expect("$shardeumHttpRpc is not set");

    // let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let provider = Provider::<Http>::try_from(rpc_shardeum_https).expect("could not instantiate HTTP Provider");

    let chainid = provider.get_chainid().await?;
    println!("Got chainid: {}", chainid);

    let signer = private_key_wallet_string.parse::<LocalWallet>()?;

    let client = SignerMiddleware::new_with_provider_chain(provider, signer).await.unwrap();

    let contract_address = "0x4A0aEd36b80b1Ba41f94D394d09f523f2a6817d9".parse::<Address>()?; //0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37

    let client_arc = Arc::new(client.clone());

    let simple_storage_instance = SimpleStorage::new(contract_address, Arc::clone(&client_arc)); //Contracts Rust Ethers credit: https://docs.rs/ethers-contract/0.2.2/ethers_contract/struct.Contract.html

    let stored_data_value = simple_storage_instance.stored_data().call().await?;

    println!("storedDataValue: {0}", stored_data_value);

    send_set_tx(client.clone(),simple_storage_instance.clone()).await.expect("Transaction function error"); //Clone the value to avoid Rust borrow checker error.

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

async fn send_set_tx(client_tx: SignerMiddleware<ethers_providers::Provider<ethers_providers::Http>, ethers_signers::Wallet<ethers_core::k256::ecdsa::SigningKey>>,
                     simple_storage_instance_tx: simple_storage::SimpleStorage<SignerMiddleware<ethers_providers::Provider<ethers_providers::Http>, Wallet<ethers_core::k256::ecdsa::SigningKey>>>) -> Result<()> {

    println!("Storage slot 0 value H256: {:?}", H256::zero() );

    let tv_sec = get_unix_time();

    println!("Transaction data for simple_storage_instance_tx.set(U256::from(tv_sec)).calldata().unwrap(): {:?}", simple_storage_instance_tx.set(U256::from(tv_sec)).calldata().unwrap() );

    let tx_raw = TransactionRequest::new()
        .chain_id(8081)
        .to(simple_storage_instance_tx.address())
        .data(simple_storage_instance_tx.set(U256::from(tv_sec)).calldata().unwrap())
        .value(0)
        .gas(200000)
        .gas_price(3_000_000_000u32) //3000000000 wei = 3 Gwei
        .with_access_list(AccessList(vec![
            AccessListItem { 
                address: simple_storage_instance_tx.address(), 
                storage_keys: vec![
                    // H256::zero() //Same as //"0x0000000000000000000000000000000000000000000000000000000000000000"
                    // H256([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                    "0x0000000000000000000000000000000000000000000000000000000000000000".parse::<H256>().unwrap()
                ] 
            }
        ] ) ); //AccessList list with 
    
    let tx_sent = client_tx.send_transaction(tx_raw, None).await?;
    println!("Tx sent hash: {:?}", tx_sent.tx_hash());

    println!("Wait for transction to be mined.");

    sleep(Duration::from_millis(15000)); //Wait 15 seconds.

    let stored_data_value_new = simple_storage_instance_tx.stored_data().call().await?;

    println!("storedDataValue: {0}", stored_data_value_new);

    // // Would not recommend sending transaction by function name since you cannot modify things like the accessList in a simple way.
    // // Send smart contract data transaction with custom MSG.VALUE and gas parameters.
    // let _tx = simple_storage_instance_tx.set(U256::from(tv_sec))
    //             .value(0)
    //             .gas(200000)
    //             .gas_price(3_000_000_000u32)
    //             .send().await?.await?;

    Ok(())

}
