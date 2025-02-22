// use alloy::{
//     primitives::U256,
// };
 
// // prb-math Solidity library:
// // https://github.com/PaulRBerg/prb-math

use libm;

fn main()   {

    // // // alloy.rust uint256 type.
    // let value_uint256_example = U256::from(1);
    // println!("value_uint256_example = {}", value_uint256_example); 

    // // i32 value types do not have methods for more complicated math operations.
    // let input: i32 = 100.0;
    

    println!("Note: Max value of u32 is 4294967295."); 

    // f64 value types have methods for more complicated math operations.
    let input: f64 = 100.0;
    println!("input value = {}", input); 

    let ln_result_float: f64 = libm::log(input); // Natural log (ln)
    println!("ln(100) = {}",ln_result_float); 
    let ln_result_uint : u32 = libm::round(ln_result_float) as u32;
    println!("{}",ln_result_uint); 

    let log10_result_float: f64 = libm::log10(input); // Natural log (ln)
    println!("log10(100) = {}",log10_result_float); 
    let log10_result_uint : u32 = libm::round(log10_result_float) as u32;
    println!("{}",log10_result_uint); 

    let log2_result_float: f64 = libm::log2(input); // Natural log (ln)
    println!("log2(100) = {}",log2_result_float); 
    let log2_result_uint : u32 = libm::round(log2_result_float) as u32;
    println!("{}",log2_result_uint); 

    let sqrt_result_float: f64 = libm::sqrt(input); // Natural log (ln)
    println!("sqrt(100) = {}",sqrt_result_float); 
    let sqrt_result_uint : u32 = libm::round(sqrt_result_float) as u32;
    println!("{}",sqrt_result_uint); 


    // f64 value types have methods for more complicated math operations.
    let input_exp: f64 = 10.0;
    println!("input_exp value = {}", input_exp); 

    let exp_result_float: f64 = libm::exp(input_exp); // Natural log (ln)
    println!("exp(100) = {}",exp_result_float); 
    // Max value of u32 is 4294967295.
    let exp_result_uint : u32 = libm::round(exp_result_float) as u32;
    println!("{}",exp_result_uint); 
    
}
