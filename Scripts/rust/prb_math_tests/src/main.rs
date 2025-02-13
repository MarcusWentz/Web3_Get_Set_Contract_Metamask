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
    // let num: i32 = 100.0;
    
    // f32 value types have methods for more complicated math operations.
    let num: f32 = 100.0;
    println!("input value = {}", num); 

    let ln_result = num.ln(); // Calculates the natural logarithm of num
    println!("ln(10) = {}", ln_result); 

    let log_result = num.log10(); // Calculates the base-10 logarithm of num
    println!("log10(10) = {}", log_result); 

    let sqrt_result = num.sqrt(); // Calculates the square root of num
    println!("sqrt(10) = {}", sqrt_result); 


    test(10); 

}

fn test(value: i32)   {
    println!("Test {:?}", value);
}