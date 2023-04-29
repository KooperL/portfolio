pub async fn discord_post(body: String) {
    let url = dotenvy::var("DISCORD_WEBHOOK_URL").expect("DISCORD_WEBHOOK_URL must be set"); 
    let client = reqwest::Client::new();
    let res = client.post(url)
        .body(body)
        .send()
        .await;
}
