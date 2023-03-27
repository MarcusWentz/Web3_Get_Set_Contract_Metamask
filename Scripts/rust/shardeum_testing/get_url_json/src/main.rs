use serde_json;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {

    let base_url = String::from("https://explorer-sphinx.shardeum.org/api/transaction?startCycle=");
    let cycle_number = 6928;

    let transaction_count : u64 = get_transaction_count(cycle_number.clone(), base_url.clone()).await;    
    println!("transaction_count: {:#?}", transaction_count);
     
    read_json_loop(cycle_number.clone(), base_url.clone(), transaction_count).await;

    Ok(())
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

