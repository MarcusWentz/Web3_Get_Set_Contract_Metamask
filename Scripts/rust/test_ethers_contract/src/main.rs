//Contracts Rust Ethers credit: https://docs.rs/ethers-contract/0.2.2/ethers_contract/struct.Contract.html
//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use std::{convert::TryFrom, path::Path};
use std::env;

use ethers_signers::{LocalWallet, Signer};
use ethers_providers::{Middleware, Provider, Http};
// use ethers_core::types::{Address,TransactionRequest};
use ethers_core::types::{Address};
use ethers_middleware::SignerMiddleware;
// use ethers::utils::Solc;
use std::sync::Arc;

use ethers::{
    abi::Abi,
    // utils::Solc,
    // types::{Address, H256},
    // types::{H256},
    contract::Contract,
    // //providers::{Provider, Http},
    // signers::Wallet,
    prelude::*,
};

use eyre::Result;

// Generate the type-safe contract bindings by providing the ABI and Bytecode in the same JSON file.
abigen!(SimpleStorage, "storeAbiBytecode.json",);

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

    let _address = "dbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37".parse::<Address>()?; //0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37

    // let abi: Abi = serde_json::from_str(r#"[{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]"#)?;

    // set the path to the contract, `CARGO_MANIFEST_DIR` points to the directory containing the
    // manifest of `ethers`. which will be `../` relative to this file
    // let source = Path::new(&env!("CARGO_MANIFEST_DIR")).join("Store.sol");
    // let compiled = Solc::default().compile_source(source).expect("Could not compile contracts");
    // let (abi, bytecode, _runtime_bytecode) =
    //     compiled.find("SimpleStorage").expect("could not find contract").into_parts_or_default();

    // Abigen::new("ERC20Token", "./abi.json")?.generate()?.write_to_file("token.rs")?;

    // create the contract object at the address

    let clientArc =
    Provider::<Ws>::connect("wss://goerli.infura.io/ws/v3/e9520f17b0944cb08b00710d60ff34ac")
        .await?;

    let _clientArc = Arc::new(client);

    let contract = SimpleStorage::new(_address, Arc::clone(&_clientArc));

    // Calling constant methods is done by calling `call()` on the method builder.
    // (if the function takes no arguments, then you must use `()` as the argument)
    // let storedDataValue = contract
    //     .method::<_, i32>("storedData", ())? //Returns a Uint, which is an i32 in Rust.
    //     .call()
    //     .await?;


    let stored_data_value = contract.stored_data().call().await?;

    println!("storedDataValue");
    println!("{0}", stored_data_value);

    let tx = contract.set(U256::from(55)).send().await?.await?;

    // let tx_raw = TransactionRequest::new()
    //     .chain_id(5)
    //     .to(signer_address)
    //     .data(contract.set(U256::from(55)))
    //     .value(0)
    //     .gas(200000)
    //     .gas_price(3_000_000_000u32); //3000000000 wei = 3 Gwei
    // let tx_raw_hash = client.send_transaction(tx_raw, None).await?;
    // let _receipt_raw = tx_raw_hash.confirmations(2).await?;


    //
    //
    //
    // // Non-constant methods are executed via the `send()` call on the method builder.
    // let call = contract
    //     .method::<_, H256>("set", "5".to_owned())?;
    // let pending_tx = call.send().await?;

    // `await`ing on the pending transaction resolves to a transaction receipt
    // let receipt = pending_tx.confirmations(2).await?;


    Ok(())

}
