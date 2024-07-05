use std::env;
use url::Url;

use alloy::{
    // network::TransactionBuilder,
    // network::{EthereumWallet, TransactionBuilder},
    network::EthereumWallet,
    // network::{EthereumWallet, ReceiptResponse, TransactionBuilder},
    // network::{EthereumWallet, TransactionBuilder},
    // node_bindings::Anvil,
    primitives::U256,
    // primitives::Address,
    // primitives::{U256,Address},
    // primitives::{U256,Address,address},
    providers::{Provider, ProviderBuilder},
    // providers::{ProviderBuilder},
    rpc::types::TransactionRequest,
    signers::local::PrivateKeySigner,
};
use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {
    // Spin up a local Anvil node.
    // Ensure `anvil` is available in $PATH.
    // let anvil = Anvil::new().try_spawn()?;

    let rpc_base_sepolia_infura_https = env::var("baseSepoliaHTTPS").expect("$baseSepoliaHTTPS is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    // let s = String::from("foo");

    // Set up signer from the first default Anvil account (Alice).
    // let signer: PrivateKeySigner = anvil.keys()[0].clone().into();
    // let signer : PrivateKeySigner = private_key_wallet_string;
    // let signer : PrivateKeySigner = LocalSigner::<private_key_wallet_string>;
    // let signer = PrivateKeySigner::random();
    let signer: PrivateKeySigner = private_key_wallet_string.parse().expect("should parse private key");
    // println!("{:?}",signer);
    // println!("{:?}",signer.address());
    // let wallet = EthereumWallet::from(signer);
    let wallet = EthereumWallet::from(signer.clone());

    // Create a provider.
    // let rpc_url = anvil.endpoint().parse()?;

    // let rpc_url = rpc_base_sepolia_infura_https;
    // fn.printn()
    let rpc_url = Url::parse(&rpc_base_sepolia_infura_https).expect("RPC url string type covert error");

    // let provider = ProviderBuilder::new().on_http(rpc_url);
    let provider = ProviderBuilder::new().with_recommended_fillers().wallet(wallet).on_http(rpc_url);

    // // Create two users, Alice and Bob.
    // let alice = anvil.addresses()[0];
    // let bob = anvil.addresses()[1];

    // // Address
    // // Vitalik's address is 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045. 
    // let addr_str = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
    // let addr: Address = Address::parse_checksummed(addr_str, None).unwrap();
    // assert_eq!(addr, address!("d8dA6BF26964aF9D7eEd9e03E53415D37aA96045"));
    // assert_eq!(addr.to_checksum(None), addr_str);

    // Based on: https://alloy.rs/examples/wallets/private_key_signer.html

    // Build a transaction to send 100 wei from Alice to Bob.
    // The `from` field is automatically filled to the first signer's address (Alice).
    let tx = TransactionRequest::default()
        // .to(address!("d8dA6BF26964aF9D7eEd9e03E53415D37aA96045"))
        // .to(addr)
        .to(signer.address())
        .value(U256::from(1))
        // .gas_price(20_000_000_000)
        .gas_limit(21_000);

    // Send the transaction and wait for the broadcast.
    let pending_tx = provider.send_transaction(tx).await?;

    println!("Pending transaction... {}", pending_tx.tx_hash());

    // Wait for the transaction to be included and get the receipt.
    let receipt = pending_tx.get_receipt().await?;

    println!(
        "Transaction included in block {}",
        receipt.block_number.expect("Failed to get block number")
    );

    // assert_eq!(receipt.from, alice);
    // assert_eq!(receipt.to, Some(bob));

    Ok(())
}
