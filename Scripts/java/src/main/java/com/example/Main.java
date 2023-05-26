import java.io.IOException; //Run in IntelliJ Java IDE with Maven support libraries
import java.math.BigInteger;
import java.time.Instant;   //Upgrade Maven: https://www.digitalocean.com/community/tutorials/install-maven-linux-ubuntu

import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j; //Maven library which goes into pom.xml found here: https://github.com/web3j/web3j#maven
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

public class Main {

    public static void main(String[] args) {

        String rpcUrlSepoliaHttps = System.getenv("sepoliaInfuraHttps"); // Set in Modify Run Configuration: https://www.youtube.com/watch?v=oYfd9pDXip8
        String privateKey = System.getenv("devTestnetPrivateKey"); // Set in Modify Run Configuration: https://www.youtube.com/watch?v=oYfd9pDXip8

        Web3j web3 = Web3j.build(new HttpService(rpcUrlSepoliaHttps));

        try {
            EthChainId chainId = web3.ethChainId().send();
            System.out.println("chainId: " + chainId.getChainId().longValue());
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            BigInteger blockNumber = web3.ethBlockNumber().send().getBlockNumber();
            System.out.println("Latest Ethereum block number: " + blockNumber);
        } catch (IOException e) {
            e.printStackTrace();
        }

        long unixTimestamp = Instant.now().getEpochSecond();
        System.out.println("unixTimestamp: " + unixTimestamp);

        String contractAddress = "0xBBE97Afb978E19033e0BDa692E6034F5b3B91312";
        //Look into generated Solidity wrapper types to automatically compute contract types: https://ethereum.stackexchange.com/a/13397

        //Generated wrapper Java file with command: web3j generate solidity -a=contracts/store.abi -b=contracts/store.bin -o=contracts -p=store

        //READ THIS: https://blogs.oracle.com/javamagazine/post/blockchain-using-cryptocurrency-with-java
        DefaultGasProvider contractGasProvider = new DefaultGasProvider();
        System.out.println("contractGasProvider: " + contractGasProvider);
        Credentials credentials = Credentials.create(privateKey);
        System.out.println("credentials : " + credentials);


    }
}