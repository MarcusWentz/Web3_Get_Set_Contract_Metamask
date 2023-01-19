//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use std::convert::TryFrom;
use std::env;

use ethers_signers::{LocalWallet, Signer};
use ethers_providers::{Middleware, Provider, Http};
use ethers_core::types::{Address,TransactionRequest};
use ethers_core::types::transaction::eip2930::{AccessList,AccessListItem};
use ethers_middleware::SignerMiddleware;
// use ethers_core::types::{Address, TransactionRequest};

use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {

    let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");

    println!("provider {:?}:", provider);

    let signer = private_key_wallet_string.parse::<LocalWallet>()?;

    let signer_address = signer.address();
    println!("signer address: {}", signer_address);

    println!("signer {:?}:", signer);

    let block = provider.get_block(0).await?;
    println!("Got block: {:?}", block);

    let other_address_hex = "0x0000000000000000000000000000000000000000";
    let other_address = "0x0000000000000000000000000000000000000000".parse::<Address>()?;
    let other_balance = provider.get_balance(other_address, None).await?;
    println!("Balance for address {}: {}",other_address_hex, other_balance);

    //Setup client with chainId from provider: https://github.com/gakonst/ethers-rs/issues/1873#issuecomment-1324248559
    let client = SignerMiddleware::new_with_provider_chain(provider, signer).await.unwrap();
    println!("client {:?}:", client);

    // let tx = TransactionRequest::pay(signer_address, 100);
    // let pending_tx = client.send_transaction(tx, None).await?;
    // let _receipt = pending_tx.confirmations(2).await?;

    let tx_raw = TransactionRequest::new()
        .chain_id(5)
        .to(signer_address)
        .value(4444)
        .gas(200000)
        .gas_price(3_000_000_000u32) //3000000000 wei = 3 Gwei'
        // .with_access_list(AccessList::default()); //Empty accessList test
        // .with_access_list(AccessList(vec![])); //Empty accessList test
        .with_access_list(AccessList(vec![
            AccessListItem { 
                address: signer_address, 
                storage_keys: vec![] }
            ] ) ); //AccessList list with wallet address with no storage slots test.
        // .with_access_list(AccessList(vec![
        //                                     AccessListItem { 
        //                                         address: signer_address, 
        //                                         storage_keys: vec![] },
        //                                     AccessListItem { 
        //                                         address: signer_address, 
        //                                         storage_keys: vec![] }
        //                                     ] ) ); //AccessList list with wallet address with no storage slots test. Repeat address twice to test syntax for multiple addresses in Rust vector.

    let tx_raw_hash = client.send_transaction(tx_raw, None).await?;

    
    let _receipt_raw = tx_raw_hash.confirmations(2).await?;

    Ok(())

}
