use serde_json;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {

    let new_todo: serde_json::Value = reqwest::Client::new()
        .get("https://explorer-sphinx.shardeum.org/api/transaction?startCycle=6928&endCycle=6928")
        .send()
        .await?
        .json()
        .await?;

    println!("JSON raw response: {:#?}", new_todo);
    println!("{:#?}", new_todo["success"]);
    println!("{:#?}", new_todo["totalTransactions"]);

    Ok(())
}