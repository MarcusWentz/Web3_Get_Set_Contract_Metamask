use std::env;
use ethers::types::transaction::eip2718::TypedTransaction;

use ethers_providers::{Provider};
use ethers_core::types::{Address};

use ethers::{
    prelude::*,
};

use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {

    // let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    // let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");

    let rpc_shardeum_https = "https://liberty20.shardeum.org/";

    let provider = Provider::<Http>::try_from(rpc_shardeum_https).expect("could not instantiate HTTP Provider");

    let contract_address = "0x8f01876ccd727fd703787ed477b7f71e1e3adbb1".parse::<Address>()?; //0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37

    let raw_call_data = Bytes::from(b"8da5cb5b");

    let mut tx_raw = TypedTransaction::Legacy(TransactionRequest::new());
    tx_raw.set_to(contract_address);
    tx_raw.set_data(raw_call_data);

    let call_return_data = provider.call(&tx_raw,None).await?;
    
    println!("{:?}", call_return_data);
    
    Ok(())

}

