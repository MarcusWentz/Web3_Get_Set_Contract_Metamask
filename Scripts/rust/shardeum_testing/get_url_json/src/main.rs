use serde_json;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {

    let base_url = String::from("https://explorer-sphinx.shardeum.org/api/transaction?startCycle=");
    let cycle_number = 6928;

    let transaction_count : u64 = get_transaction_count(cycle_number.clone(), base_url.clone()).await;    
    println!("transaction_count: {:#?}", transaction_count);

    // transactionCount := getTransactionCount(6928, baseUrl)
    // log.Println(transactionCount)
     
    //readJsonLoop(transactionCount, baseUrl)

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