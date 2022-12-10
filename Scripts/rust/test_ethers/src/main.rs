//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use std::convert::TryFrom;
use std::env;

// use ethers::signers::{LocalWallet};
use ethers_signers::{LocalWallet, Signer};
// use ethers_signers::{Client, ClientError, Wallet};

use ethers_providers::{Middleware, Provider, Http};
// use ethers_core::types::{Address};

use ethers_core::types::{Address,TransactionRequest};
// use ethers_core::{k256::ecdsa::SigningKey, types::TransactionRequest};



// use ethers::middleware::SignerMiddleware;




use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {

    let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");
    // provider.set_chain(&mut 5);

    println!("provider {:?}:", provider);

    // let signer: LocalWallet = private_key_wallet_string.parse().expect("fail parse");


    let signer = private_key_wallet_string
    .parse::<LocalWallet>()?;

    // let signer = signer.set_chain_id(5u64);

    // let signer = signer.set_chain_id(1337u64);

    println!("signer {:?}:", signer);
    // println!("signer {:?}:", signer.chain_Id);

    // let signer = signer.set_chain_id(1337u64);

    // let client = SignerMiddleware::new(provider, signer);

    // println!("client {:?}:", client);

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

    // // create a transaction
    // let tx = TransactionRequest::new()
    //     .chain_id(5)
    //     .to(other_address) // this will use ENS
    //     .value(10000).into();
    //
    // // sign it
    // let signature = signer.sign_transaction(&tx).await?;
    //
    // println!("signature {:?}: ", signature);
    //
    // println!("Balance for address {}: {}",first_address_hex, first_balance);
    // println!("Balance for address {}: {}",other_address_hex, other_balance);

    // instantiate the wallet

    Ok(())

}
