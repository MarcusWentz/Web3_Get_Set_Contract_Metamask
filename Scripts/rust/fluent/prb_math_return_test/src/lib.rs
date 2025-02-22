#![cfg_attr(target_arch = "wasm32", no_std)]
extern crate alloc;

// float64 and float32 methods library for complex math functions :
// (ln,log10,log2,sqrt,exp)
// since we do not have access to the Rust standard library (std) with setting "no_std" with the wasm32 target file.
use libm;

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
    // Make sure type interfaces are defined here 
    fn rustLnUint256(&self) -> U256;
    fn rustLog10Uint256(&self) -> U256;
    fn rustLog2Uint256(&self) -> U256;
    fn rustSqrtUint256(&self) -> U256;
    fn rustExpUint256(&self) -> U256;
}

#[router(mode = "solidity")]
impl<SDK: SharedAPI> RouterAPI for ROUTER<SDK> {

    // ERC-20 with Fluent SDK example:
    // https://github.com/fluentlabs-xyz/fluentbase/blob/devel/examples/erc20/lib.rs

    #[function_id("rustLnUint256()")]
    fn rustLnUint256(&self) -> U256 {

        // // f64 value types have methods for more complicated math operations.
        let input: f64 = 100.0;

        let ln_result = libm::log(input); // Natural log (ln)

        let uint256_test = U256::from(10);
        return uint256_test;
    }

    #[function_id("rustLog10Uint256()")]
    fn rustLog10Uint256(&self) -> U256 {

        // // f64 value types have methods for more complicated math operations.
        let input: f64 = 100.0;

        let log10_result = libm::log10(input); // Calculates the base-10 logarithm of input

        let uint256_test = U256::from(10);
        return uint256_test;
    }

    #[function_id("rustLog2Uint256()")]
    fn rustLog2Uint256(&self) -> U256 {

        // // f64 value types have methods for more complicated math operations.
        let input: f64 = 100.0;

        let log2_result = libm::log2(input); // Calculates the base-2 logarithm of input

        let uint256_test = U256::from(10);
        return uint256_test;
    }

    #[function_id("rustSqrtUint256()")]
    fn rustSqrtUint256(&self) -> U256 {

        // // f64 value types have methods for more complicated math operations.
        let input: f64 = 100.0;

        let sqrt_result = libm::sqrt(input); // Calculates the square root of input

        let uint256_test = U256::from(10);
        return uint256_test;
    }

    #[function_id("rustExpUint256()")]
    fn rustExpUint256(&self) -> U256 {

        // // f64 value types have methods for more complicated math operations.
        let input: f64 = 100.0;

        let exp_result = libm::exp(input); // Calculates the exp (e^x) of input

        let uint256_test = U256::from(10);
        return uint256_test;
    }


}

impl<SDK: SharedAPI> ROUTER<SDK> {
    fn deploy(&self) {
        // any custom deployment logic here
    }
}

basic_entrypoint!(ROUTER);