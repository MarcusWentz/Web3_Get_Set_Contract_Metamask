//Contracts Rust Ethers credit: https://docs.rs/ethers-contract/0.2.2/ethers_contract/struct.Contract.html
//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use std::convert::TryFrom;
use std::env;

use ethers_signers::{LocalWallet, Signer};
use ethers_providers::{Middleware, Provider, Http};
use ethers_core::types::{Address,TransactionRequest};
use ethers_middleware::SignerMiddleware;

use ethers::{
    abi::Abi,
    // utils::Solc,
    // types::{Address, H256},
    // types::{H256},
    contract::Contract,
    // //providers::{Provider, Http},
    // signers::Wallet,
};

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

    //Setup client with chainId from provider: https://github.com/gakonst/ethers-rs/issues/1873#issuecomment-1324248559
    let client = SignerMiddleware::new_with_provider_chain(provider, signer).await.unwrap();
    println!("client {:?}:", client);

    let address = "dbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37".parse::<Address>()?; //0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37

    let abi: Abi = serde_json::from_str(r#"[{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]"#)?;

    // create the contract object at the address
    let contract = Contract::new(address, abi, client);

    // Calling constant methods is done by calling `call()` on the method builder.
    // (if the function takes no arguments, then you must use `()` as the argument)
    let storedDataValue = contract
        .method::<_, i32>("storedData", ())? //Returns a Uint, which is an i32 in Rust.
        .call()
        .await?;

    println!("storedDataValue");
    println!("{0}", storedDataValue);

    // Non-constant methods are executed via the `send()` call on the method builder.
    // let call = contract
    //     .method::<_, H256>("setValue", "hi".to_owned())?;
    // let pending_tx = call.send().await?;
    //
    // // `await`ing on the pending transaction resolves to a transaction receipt
    // let receipt = pending_tx.confirmations(6).await?;
    //
    //

    Ok(())

}
