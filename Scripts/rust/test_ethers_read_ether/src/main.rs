//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use std::convert::TryFrom;
use std::env;

use ethers_signers::{LocalWallet, Signer};
use ethers_providers::{Middleware, Provider, Http};
use ethers_core::types::{Address};

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

    let ens_balance = provider.get_balance("car.eth", None).await?;
    println!("ENS address balance: {}", ens_balance);

    Ok(())

}
