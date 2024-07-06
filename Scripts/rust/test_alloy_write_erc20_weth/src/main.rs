use std::env;
use url::Url;

use alloy::{
    network::EthereumWallet,
    providers::{Provider, ProviderBuilder},
    signers::local::PrivateKeySigner,
    primitives::U256,
    sol,
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

    // Pass RPC (Base Sepolia)
    let rpc_base_sepolia_infura_https = env::var("baseSepoliaHTTPS").expect("$baseSepoliaHTTPS is not set");
   
    // // Fail RPC (Any network that is not Base Sepolia)
    // let rpc_base_sepolia_infura_https = env::var("optimismSepoliaHTTPS").expect("$baseSepoliaHTTPS is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let signer: PrivateKeySigner = private_key_wallet_string.parse().expect("should parse private key");
    let wallet = EthereumWallet::from(signer.clone());

    let rpc_url = Url::parse(&rpc_base_sepolia_infura_https).expect("RPC url string type covert error");
    
    let provider = ProviderBuilder::new()
        .with_recommended_fillers()
        .wallet(wallet)
        .on_http(rpc_url);

    // println!("{:?}", provider);

    // // https://docs.rs/alloy/latest/alloy/providers/fillers/struct.FillProvider.html

    let chain_id_connected = provider.get_chain_id().await?;    // println!("{:?}", latest_block);
    println!("chainId {:?}", chain_id_connected);

    let latest_block = provider.get_block_number().await?;
    println!("latestBlock {:?}", latest_block);

    let base_sepolia_chain_id = 84532;

    if chain_id_connected != base_sepolia_chain_id {
        println!("RPC endpoint not connected to Base Sepolia (chainId {}).",base_sepolia_chain_id);
        println!("Switch to Base Sepolia then try again.");
        return Ok(())
    }

    let contract = WETH9::new("0x4200000000000000000000000000000000000006".parse()?, provider);

    let total_supply_before = contract.totalSupply().call().await?._0;
    println!("total_supply_before {}", total_supply_before);
    let user_balance_before = contract.balanceOf(signer.address()).call().await?._0;
    println!("user_balance_before {}", user_balance_before);

    println!("Waiting to deposit 1 WEI for WETH...");

    // Deposit 1 WEI
    let tx_hash = contract
        .deposit()
        .value(U256::from(1))
        .send().await?
        .watch().await?;

    // // Transfer 1 WEI to signer (self).
    // let tx_hash = contract
    //     .transfer(signer.address(),U256::from(1))
    //     .send().await?
    //     .watch().await?;

    // // Withdraw 1 WEI.
    // let tx_hash = contract
    //     .withdraw(U256::from(1))
    //     .send().await?
    //     .watch().await?;

    println!("Sent transaction: {tx_hash}");

    let total_supply_after = contract.totalSupply().call().await?._0;
    println!("total_supply_after {}", total_supply_after);
    let user_balance_after = contract.balanceOf(signer.address()).call().await?._0;
    println!("user_balance_after {:?}", user_balance_after);
    
    Ok(())
}
