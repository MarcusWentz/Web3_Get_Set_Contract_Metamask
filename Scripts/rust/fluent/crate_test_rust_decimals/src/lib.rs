#![cfg_attr(target_arch = "wasm32", no_std)]
extern crate alloc;

// float64 and float32 methods library for complex math functions :
// (ln,log10,log2,sqrt,exp)
// since we do not have access to the Rust standard library (std) with setting "no_std" with the wasm32 target file.

// use rust_decimal_macros::dec;
use rust_decimal::prelude::*;

// use alloc::string::{String, ToString};
use fluentbase_sdk::{
    basic_entrypoint,
    derive::{router, Contract},
    SharedAPI,
    // U256,    // alloy Solidity type for uint256
    U128,    // alloy Solidity type for uint128
    // Address, // alloy Solidity type for address
    // address, // alloy Solidity marco to define values for type Address
    // Bytes,   // alloy Solidity type for bytes
    // B256,    // alloy Solidity type for bytes32
    // b256     // alloy Solidity marco to define values for type B256
};

#[derive(Contract)]
struct ROUTER<SDK> {
    sdk: SDK,
}

pub trait RouterAPI {
    // // Make sure type interfaces are defined here 
    // fn rust_ln_uint256(&self) -> U256;
    // fn rust_log10_uint256(&self) -> U256;
    // fn rust_log2_uint256(&self) -> U256;
    fn rust_sqrt_uint128(&self, input: U128) -> U128;
    // fn rust_exp_uint256(&self) -> U256;
}

#[router(mode = "solidity")]
impl<SDK: SharedAPI> RouterAPI for ROUTER<SDK> {

    // // ERC-20 with Fluent SDK example:
    // // https://github.com/fluentlabs-xyz/fluentbase/blob/devel/examples/erc20/lib.rs

    // // println!("Note: Max value of u32 is 4294967295."); 

    // #[function_id("rustLnUint256()")]
    // fn rust_ln_uint256(&self) -> U256 {

    //     // // f64 value types have methods for more complicated math operations.
    //     let input: f64 = 100.0;

    //     let ln_result_float: f64 = libm::log(input); // Natural log (ln)
    //     let ln_result_uint : u32 = libm::round(ln_result_float) as u32;

    //     // let uint256_test = U256::from(10);
        
    //     let uint256_test = U256::from(ln_result_uint);
        
    //     return uint256_test;
    // }

    // #[function_id("rustLog10Uint256()")]
    // fn rust_log10_uint256(&self) -> U256 {

    //     // // f64 value types have methods for more complicated math operations.
    //     let input: f64 = 100.0;

    //     let log10_result_float: f64 = libm::log10(input); // Natural log (ln)
    //     // println!("log10(100) = {}",log10_result_float); 
    //     let log10_result_uint : u32 = libm::round(log10_result_float) as u32;
    //     // println!("{}",log10_result_uint); 
    
        
    //     let uint256_test = U256::from(log10_result_uint);
    //     return uint256_test;
    // }

    // #[function_id("rustLog2Uint256()")]
    // fn rust_log2_uint256(&self) -> U256 {

    //     // // f64 value types have methods for more complicated math operations.
    //     let input: f64 = 100.0;

    //     let log2_result_float: f64 = libm::log2(input); // Natural log (ln)
    //     // println!("log2(100) = {}",log2_result_float); 
    //     let log2_result_uint : u32 = libm::round(log2_result_float) as u32;
    //     // println!("{}",log2_result_uint); 
        
    //     let uint256_test = U256::from(log2_result_uint);
    //     return uint256_test;
    // }

    #[function_id("rustSqrtUint128(uint128 input)")]
    fn rust_sqrt_uint128(&self, input: U128) -> U128 {

        let u128_input : u128 = input.to();
        let decimal_input = Decimal::from(u128_input);
        let sqrt_dec = decimal_input.sqrt();
        let sqrt_u32 = sqrt_dec
            .map(   
                |d| d.trunc()
                .to_u32()
                .expect("Too big for u32"))
            .unwrap_or(0); // fallback if sqrt is None

        // // // f64 value types have methods for more complicated math operations.
        // let input: f64 = 100.0;

        // let sqrt_result_float: f64 = Decimal::sqrt(input); // Natural log (ln)
        // // println!("sqrt(100) = {}",sqrt_result_float); 
        // let sqrt_result_uint : u32 = Decimal::round(sqrt_result_float) as u32;
        // // println!("{}",sqrt_result_uint); 
        
        let uint256_test = U128::from(sqrt_u32);
        return uint256_test;
    }

    // #[function_id("rustExpUint256()")]
    // fn rust_exp_uint256(&self) -> U256 {

    //     // // f64 value types have methods for more complicated math operations.
    //     let input_exp: f64 = 10.0;
    //     // println!("input_exp value = {}", input_exp); 
    
    //     let exp_result_float: f64 = libm::exp(input_exp); // Natural log (ln)
    //     // println!("exp(100) = {}",exp_result_float); 
    //     // Max value of u32 is 4294967295.
    //     let exp_result_uint : u32 = libm::round(exp_result_float) as u32;
    //     // println!("{}",exp_result_uint); 

    //     let uint256_test = U256::from(exp_result_uint);
    //     return uint256_test;
    // }


}

impl<SDK: SharedAPI> ROUTER<SDK> {
    fn deploy(&self) {
        // any custom deployment logic here
    }
}

basic_entrypoint!(ROUTER);