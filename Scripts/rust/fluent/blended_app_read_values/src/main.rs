use url::Url;

use alloy::{
    providers::{Provider, ProviderBuilder},
    sol,
};
use eyre::Result;

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    SimpleStorage,  
    "abi/SimpleStorage.json"
);

#[tokio::main]
async fn main() -> Result<()> {

    // Pass RPC (Base Sepolia)
    let rpc_base_sepolia_infura_https = "https://rpc.dev.gblend.xyz";
   
    // // Fail RPC (Any network that is not Base Sepolia)
    // let rpc_base_sepolia_infura_https = env::var("optimismSepoliaHTTPS").expect("$baseSepoliaHTTPS is not set");

    let rpc_url_http = Url::parse(&rpc_base_sepolia_infura_https).expect("RPC url string type covert error");
    
    let provider_http = ProviderBuilder::new()
        .with_recommended_fillers()
        .on_http(rpc_url_http);

    // println!("{:?}", provider_http);

    // // https://docs.rs/alloy/latest/alloy/providers/fillers/struct.FillProvider.html

    let chain_id_connected = provider_http.get_chain_id().await?;    // println!("{:?}", latest_block);
    println!("chainId {:?}", chain_id_connected);

    let latest_block = provider_http.get_block_number().await?;
    println!("latestBlock {:?}", latest_block);

    let base_sepolia_chain_id = 20993;

    if chain_id_connected != base_sepolia_chain_id {
        println!("RPC endpoint not connected to Fluent Sepolia (chainId {}).",base_sepolia_chain_id);
        println!("Switch to Fluent Sepolia then try again.");
        return Ok(())
    }

    let contract = SimpleStorage::new("0xd810284B98f41681477D89888Ce81f1b63690568".parse()?, provider_http);

    let fluent_rust_contract_address = contract.fluentRust().call().await?._0;
    println!("fluent_rust_contract_address {}", fluent_rust_contract_address);

    let get_rust_string = contract.getRustString().call().await?._0;
    println!("get_rust_string {}", get_rust_string);

    let get_rust_uint256 = contract.getRustUint256().call().await?._0;
    println!("get_rust_uint256 {}", get_rust_uint256);

    let get_rust_int256 = contract.getRustInt256().call().await?._0;
    println!("get_rust_int256 {}", get_rust_int256);

    let get_rust_address = contract.getRustAddress().call().await?._0;
    println!("get_rust_address {}", get_rust_address);

    let get_rust_bytes = contract.getRustBytes().call().await?._0;
    println!("get_rust_bytes {}", get_rust_bytes);

    let get_rust_bytes32 = contract.getRustBytes32().call().await?._0;
    println!("get_rust_bytes32 {}", get_rust_bytes32);

    let get_rust_bool = contract.getRustBool().call().await?._0;
    println!("get_rust_bool {}", get_rust_bool);
    
    Ok(())

}

