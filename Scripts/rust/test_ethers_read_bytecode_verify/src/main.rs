//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use std::convert::TryFrom;
use std::env;

use ethers_providers::{Middleware, Provider, Http};
use ethers_core::types::{Address};

use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {

    let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");

    let chainid = provider.get_chainid().await?;
    println!("Got chainid: {}", chainid);

    let other_address_hex = "0x0000000000000000000000000000000000000000";
    let other_address = "0x0000000000000000000000000000000000000000".parse::<Address>()?;
    let other_balance = provider.get_balance(other_address, None).await?;
    println!("Balance for address {}: {}",other_address_hex, other_balance);

    let apple = String::from("apple");
    let banana = String::from("banana");
    println!("String apple is the same as a banana: {}", apple.eq(&banana));
    
    let bytecode1 = ethers_core::types::Bytes::from(b"hello");
    let bytecode2 = ethers_core::types::Bytes::from(b"hello");
    println!("Bytes string hello is the same as hello: {}", bytecode1.eq(&bytecode2));

    let address_with_bytecode = "0x080FfD52b6c217C1B69a03446f2956580e25fd43".parse::<Address>()?;
    println!("Got addresss: {:?}", address_with_bytecode);
    let bytecode_from_address = provider.get_code(address_with_bytecode, None).await?;
    println!("Got bytecode from address: {:?}", bytecode_from_address);

    // // Even with the same Solidity compiler version the bytecode does not change. Etherscan filters bytecode beyond this?
    // let etherscan_bytecode_compare = ethers_core::types::Bytes::from(b"608060405234801561001057600080fd5b506101b5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632a1afcd91461003b57806360fe47b114610059575b600080fd5b610043610075565b604051610050919061013e565b60405180910390f35b610073600480360381019061006e9190610102565b61007b565b005b60005481565b8060005414156100b7576040517f31bd1a3200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806000819055507f18cb83691e852ee1dc42e2976721376968dcf2e0264b99aad1005009bf52a05560405160405180910390a150565b6000813590506100fc81610168565b92915050565b60006020828403121561011857610117610163565b5b6000610126848285016100ed565b91505092915050565b61013881610159565b82525050565b6000602082019050610153600083018461012f565b92915050565b6000819050919050565b600080fd5b61017181610159565b811461017c57600080fd5b5056fea26469706673582212205fb65bd1d147c82308f3adf44c185dff096016814a3c5975344b122e0b2e593164736f6c63430008070033");
    // println!("Matching etherscan_bytecode_compare and bytecode_from_address: {}", etherscan_bytecode_compare.eq(&bytecode_from_address));

    Ok(())

}

