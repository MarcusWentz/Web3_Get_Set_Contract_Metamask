package com.example; //Run: mvn clean
import java.io.IOException;
import java.math.BigInteger; //
import java.time.Instant;   //Upgrade Maven: https://www.digitalocean.com/community/tutorials/install-maven-linux-ubuntu
// import org.web3j.protocol.Web3j; //Maven library which goes into pom.xml found here: https://github.com/web3j/web3j#maven
// import org.web3j.protocol.http.HttpService;

public class read {
    public static void main(String[] args) { //Click "Run" in VSCodium above this main function.
        String rpcUrlSepoliaHttps = System.getenv("sepoliaInfuraHttps");
        System.out.println("rpcUrlSepoliaHttps: " + rpcUrlSepoliaHttps);
        long unixTimestamp = Instant.now().getEpochSecond();
        System.out.println("unixTimestamp: " + unixTimestamp);

        // Web3j web3 = Web3j.build(new HttpService(rpcUrlSepoliaHttps)); // Need Java 1.8: sudo update-alternatives --set java /usr/lib/jvm/jdk1.8.0_version/bin/java

        // try {
        //     BigInteger blockNumber = web3.ethBlockNumber().send().getBlockNumber();
        //     System.out.println("Latest Ethereum block number: " + blockNumber);
        // } catch (IOException e) {
        //     e.printStackTrace();
        // }
    }
}