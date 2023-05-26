import java.io.IOException; //Run in IntelliJ Java IDE with Maven support libraries 
import java.math.BigInteger;
import java.time.Instant;   //Upgrade Maven: https://www.digitalocean.com/community/tutorials/install-maven-linux-ubuntu
import org.web3j.protocol.Web3j; //Maven library which goes into pom.xml found here: https://github.com/web3j/web3j#maven
import org.web3j.protocol.http.HttpService;

public class Main {

    public static void main(String[] args) { 
        String rpcUrlSepoliaHttps = System.getenv("sepoliaInfuraHttps"); // Set in Modify Run Configuration: https://www.youtube.com/watch?v=oYfd9pDXip8
        System.out.println("rpcUrlSepoliaHttps: " + rpcUrlSepoliaHttps);
        long unixTimestamp = Instant.now().getEpochSecond();
        System.out.println("unixTimestamp: " + unixTimestamp);

        Web3j web3 = Web3j.build(new HttpService(rpcUrlSepoliaHttps)); 
        System.out.println("web3: " + web3);

         try {
             BigInteger blockNumber = web3.ethBlockNumber().send().getBlockNumber();
             System.out.println("Latest Ethereum block number: " + blockNumber);
         } catch (IOException e) {
             System.out.println("web3: " + web3);
             e.printStackTrace();
         }
    }
}