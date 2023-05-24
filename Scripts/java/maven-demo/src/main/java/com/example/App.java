package com.example;

public class App //Run with /usr/bin/env /usr/lib/jvm/java-17-openjdk-amd64/bin/java -XX:+ShowCodeDetailsInExceptionMessages -cp /home/marcuswentz/github/Web3_Get_Set_Contract_Metamask/Scripts/java/maven-demo/target/classes com.example.App
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
    }
}

// import org.web3j.protocol.Web3j;
// import org.web3j.protocol.http.HttpService;
// import java.io.IOException;
// import java.math.BigInteger;

// public class a {
//     public static void main(String[] args) {
//         Web3j web3 = Web3j.build(new HttpService("https://sepolia.infura.io/v3/e9520f17b0944cb08b00710d60ff34ac"));

//         try {
//             BigInteger blockNumber = web3.ethBlockNumber().send().getBlockNumber();
//             System.out.println("Latest Ethereum block number: " + blockNumber);
//         } catch (IOException e) {
//             e.printStackTrace();
//         }
//     }
// }