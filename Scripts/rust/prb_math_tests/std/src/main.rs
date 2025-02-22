// use alloy::{
//     primitives::U256,
// };
 
// // prb-math Solidity library:
// // https://github.com/PaulRBerg/prb-math

fn main()   {

    // // // alloy.rust uint256 type.
    // let value_uint256_example = U256::from(1);
    // println!("value_uint256_example = {}", value_uint256_example); 

    // // i32 value types do not have methods for more complicated math operations.
    // let input: i32 = 100.0;
    
    // f64 value types have methods for more complicated math operations.
    let input: f64 = 100.0;
    println!("input value = {}", input); 

    let ln_result = input.ln(); // Calculates the natural logarithm of input
    println!("ln(100) = {}", ln_result); 

    let log10_result = input.log10(); // Calculates the base-10 logarithm of input
    println!("log10(100) = {}", log10_result); 

    let log2_result = input.log2(); // Calculates the base-2 logarithm of input
    println!("log2(100) = {}", log2_result); 

    let sqrt_result = input.sqrt(); // Calculates the square root of input
    println!("sqrt(100) = {}", sqrt_result); 

    let exp_result = input.exp(); // Calculates the exp (e^x) of input
    println!("exp(100) = {}", exp_result); 

    test(10); 

}

fn test(value: i32)   {
    println!("Test {:?}", value);
}