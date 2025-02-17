#![cfg_attr(target_arch = "wasm32", no_std)]
extern crate alloc;

use alloc::string::{String, ToString};
use fluentbase_sdk::{
    basic_entrypoint,
    derive::{function_id, router, Contract},
    SharedAPI,
    U256,    // alloy Solidity type for uint256
    Address, // alloy Solidity type for address
    address, // alloy Solidity marco to define values for type Address
    Bytes,   // alloy Solidity type for bytes
    B256,    // alloy Solidity type for bytes32
    b256     // alloy Solidity marco to define values for type B256
};

#[derive(Contract)]
struct ROUTER<SDK> {
    sdk: SDK,
}

pub trait RouterAPI {
    // Make sure type interfaces are defined here or else there will be a compiler error.
    fn rustString(&self) -> String;
    fn rustUint256(&self) -> U256;
    // fn rustInt256(&self) -> I256;
    fn rustAddress(&self) -> Address;
    fn rustBytes(&self) -> Bytes;
    fn rustBytes32(&self) -> B256;
    fn rustBool(&self) -> bool;
}

#[router(mode = "solidity")]
impl<SDK: SharedAPI> RouterAPI for ROUTER<SDK> {

    // ERC-20 with Fluent SDK example:
    // https://github.com/fluentlabs-xyz/fluentbase/blob/devel/examples/erc20/lib.rs

    #[function_id("rustString()")]
    fn rustString(&self) -> String {
        let string_test = "Hello".to_string();
        return string_test;
    }

    #[function_id("rustUint256()")]
    fn rustUint256(&self) -> U256 {
        let uint256_test = U256::from(10);
        return uint256_test;
    }

    // #[function_id("rustInt256()")]
    // fn rustInt256(&self) -> I256 {
    //     return I256::from(-10)
    // }

    #[function_id("rustAddress()")]
    fn rustAddress(&self) -> Address {
        let address_test: Address = address!("d8da6bf26964af9d7eed9e03e53415d37aa96045"); // vitalik.eth 0xd8da6bf26964af9d7eed9e03e53415d37aa96045
        return address_test;
    }
    
    #[function_id("rustBytes()")]
    fn rustBytes(&self) -> Bytes {
        let bytes_test = Bytes::from("FLUENT");
        return bytes_test;
    }

    #[function_id("rustBytes32()")]
    fn rustBytes32(&self) -> B256 {
        let bytes256_test = b256!("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
        return bytes256_test;
    }

    #[function_id("rustBool()")]
    fn rustBool(&self) -> bool {
        let bool_test = true;
        return bool_test;
    }

}

impl<SDK: SharedAPI> ROUTER<SDK> {
    fn deploy(&self) {
        // any custom deployment logic here
    }
}

basic_entrypoint!(ROUTER);