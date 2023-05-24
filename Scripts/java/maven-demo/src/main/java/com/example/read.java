package com.example; 
// import java.io.IOException;
// import java.math.BigInteger;
// import org.web3j.protocol.Web3j; //Maven library which goes into pom.xml found here: https://github.com/web3j/web3j#maven
// import org.web3j.protocol.http.HttpService; 

public class read {
    public static void main(String[] args) { //Click "Run" in VSCodium above this main function.
        String rpcUrlSepoliaHttps = System.getenv("sepoliaInfuraHttps");
        System.out.println("rpcUrlSepoliaHttps: " + rpcUrlSepoliaHttps);

        // Web3j web3 = Web3j.build(new HttpService(rpcUrlSepoliaHttps)); // Need Java 1.8: sudo update-alternatives --set java /usr/lib/jvm/jdk1.8.0_version/bin/java

        // try {
        //     BigInteger blockNumber = web3.ethBlockNumber().send().getBlockNumber();
        //     System.out.println("Latest Ethereum block number: " + blockNumber);
        // } catch (IOException e) {
        //     e.printStackTrace();
        // }
    }
}