use serde_json;
use ethers_providers::{Middleware, Provider, Http};
use std::thread::{sleep};
use std::time::{Duration};

#[tokio::main]
async fn main() {

    let rpc_shardeum_https = "https://sphinx.shardeum.org/";

    let provider = Provider::<Http>::try_from(rpc_shardeum_https).expect("could not instantiate HTTP Provider");

    let chainid = provider.get_chainid().await.unwrap();
    println!("Got chainid: {}", chainid);

    loop{

        let current_block_number = provider.get_block_number().await.unwrap();
        println!("current_block_number: {:?}", current_block_number);

        let current_cycle_number = current_block_number/10;
        println!("current_cycle_number: {:?}", current_cycle_number);

        let current_cycle_number_minus_one = current_cycle_number-1;
        println!("current_cycle_number: {:?}", current_cycle_number_minus_one);

        let base_url = String::from("https://explorer-sphinx.shardeum.org/api/transaction?startCycle=");

        let transaction_count : u64 = get_transaction_count(current_cycle_number_minus_one.as_u64().clone(), base_url.clone()).await;    
        println!("transaction_count: {:#?}", transaction_count);
        
        read_json_loop(current_cycle_number_minus_one.as_u64().clone(), base_url.clone(), transaction_count).await;

        sleep(Duration::from_millis(60000)); // Sleep for 60 seconds.

    }

}

async fn get_transaction_count(cycle_number: u64, base_url: String) -> u64   {

    let get_request_url = 
        base_url +
        &cycle_number.to_string() +
        "&endCycle=" +
        &cycle_number.to_string();
    println!("getRequestUrl: {:#?}", get_request_url);

    let new_todo: serde_json::Value = reqwest::Client::new()
        .get(get_request_url)
        .send()
        .await.unwrap()
        .json()
        .await.unwrap();

    println!("JSON raw response: {:#?}", new_todo);
    println!("{:#?}", new_todo["success"]);
    println!("{:#?}", new_todo["totalTransactions"]);
    println!("{:#?}", new_todo["totalTransactions"].as_u64().unwrap());

    return new_todo["totalTransactions"].as_u64().unwrap();

}

async fn read_json_loop(cycle_number: u64, base_url: String, total_transactions: u64) {

   let mut total : i64 = total_transactions as i64; //Convert value to be signed so we do not have an underflow error when the value become negative.
   let mut page_index = 1;

   while total > 0 {

        let get_request_url = 
            base_url.clone() +
            &cycle_number.to_string() +
            "&endCycle=" +
            &cycle_number.to_string() +
            "&page=" + 
            &page_index.to_string();
        println!("getRequestUrl: {:#?}", get_request_url);

        let new_todo: serde_json::Value = reqwest::Client::new()
            .get(get_request_url)
            .send()
            .await.unwrap()
            .json()
            .await.unwrap();
    
        println!("JSON raw response: {:#?}", new_todo);

        total -= 10;
        page_index += 1;
    }   
    
}