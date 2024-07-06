use std::env;
use url::Url;

use alloy::{
    network::EthereumWallet,
    providers::ProviderBuilder, 
    signers::local::PrivateKeySigner,
    // primitives::U256,
    sol
};
use eyre::Result;

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    WETH9,  
    "abi/WETH9.json"
);

#[tokio::main]
async fn main() -> Result<()> {

    let rpc_base_sepolia_infura_https = env::var("baseSepoliaHTTPS").expect("$baseSepoliaHTTPS is not set");
    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let signer: PrivateKeySigner = private_key_wallet_string.parse().expect("should parse private key");
    let wallet = EthereumWallet::from(signer.clone());

    let rpc_url = Url::parse(&rpc_base_sepolia_infura_https).expect("RPC url string type covert error");
    let provider = ProviderBuilder::new()
        .with_recommended_fillers()
        .wallet(wallet)
        .on_http(rpc_url);

    println!("{:?}", provider);
    //https://docs.rs/alloy/latest/alloy/providers/fillers/struct.FillProvider.html
    // println!("{:?}", provider.get_receipt());
    // let latest_block = provider.get_block_number().await?;
    // println!("{:?}", latest_block);

    // // println!("{:?}", Provider::get_chain_id);

    // // let chain_id_connected = provider.chain_id();

    // // if chain_id_connected == U256::from(1) {
    // //     println!("MAINNET");
    
    // // }



    // // Create a contract instance.
    // let contract = WETH9::new("0x4200000000000000000000000000000000000006".parse()?, provider);

    // // Call the contract, retrieve the total supply.
    // let WETH9::totalSupplyReturn { _0 } = contract.totalSupply().call().await?;

    // println!("WETH total supply is {_0}");

    Ok(())
}
