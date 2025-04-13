import java.io.IOException; //Run in IntelliJ Java IDE with Maven support libraries
import java.math.BigInteger;
import java.time.Instant;   //Upgrade Maven: https://www.digitalocean.com/community/tutorials/install-maven-linux-ubuntu

//IntelliJ Import: File > Project Structure > Libraries > + > From Maven
import org.web3j.crypto.Credentials;  //org.web3.crypto
import org.web3j.protocol.Web3j; //org.web3.core
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.websocket.WebSocketService;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.protocol.core.methods.request.EthFilter;

import org.example.store.Store;

public class Main {

    public static void main(String[] args) throws Exception {

        String rpcUrlSepoliaHttps = System.getenv("sepoliaInfuraHttps"); // Set in Modify Run Configuration: https://www.youtube.com/watch?v=oYfd9pDXip8
        String privateKey = System.getenv("devTestnetPrivateKey"); // IntelliJ variables: make sure you remove string quotes around values

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

        String contractAddress = "0xBBE97Afb978E19033e0BDa692E6034F5b3B91312";

        DefaultGasProvider contractGasProvider = new DefaultGasProvider();
        System.out.println("contractGasProvider: " + contractGasProvider);
        Credentials credentials = Credentials.create(privateKey);
        System.out.println("credentials : " + credentials);

        //Solidity wrapper types to automatically compute contract types: https://ethereum.stackexchange.com/a/13397
        //Generated wrapper Java file with command: web3j generate solidity -a=contracts/store.abi -b=contracts/store.bin -o=contracts -p=store
        Store contract = Store.load(contractAddress, web3, credentials, contractGasProvider);

        BigInteger storedDataValue = contract.storedData().send();
        System.out.println("storedDataValue : " + storedDataValue);

        long unixTimestampLong = Instant.now().getEpochSecond();
        String unixTimestampString = Long.toString(unixTimestampLong);
        BigInteger unixTimestampBigInt = new BigInteger(unixTimestampString);
        System.out.println("unixTimestampBigInt: " + unixTimestampBigInt);

        TransactionReceipt tx = contract.set(unixTimestampBigInt).send();
        System.out.println("tx : " + tx);

        //Setup smart contract events: https://stackoverflow.com/questions/67641569/web3j-getting-last-events-from-a-smart-contract
        String rpcUrlSepoliaWss = System.getenv("sepoliaInfuraWSS"); // Set in Modify Run Configuration: https://www.youtube.com/watch?v=oYfd9pDXip8

        WebSocketService wss = new WebSocketService(rpcUrlSepoliaWss, false);
        try {
            wss.connect();
        } catch (Exception e) {
            System.out.println("Error while connecting to WSS service: " + e);
            throw e;
        }

        Web3j web3jWebsocket = Web3j.build(wss);

        EthFilter filter = new EthFilter(DefaultBlockParameterName.LATEST, DefaultBlockParameterName.LATEST, contractAddress);

        web3jWebsocket.ethLogFlowable(filter).subscribe(event -> {
            System.out.println("Event received. Event log: " + event);
            BigInteger storedDataValueEvent = contract.storedData().send();
            System.out.println("storedDataValueEvent : " + storedDataValueEvent);
        }, error -> {
            System.out.println("Error: " + error);
        });

    }
}

