package org.example.store;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.4.2.
 */
@SuppressWarnings("rawtypes")
public class Store extends Contract {
    public static final String BINARY = "608060405234801561001057600080fd5b50610179806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632a1afcd91461003b57806360fe47b114610059575b600080fd5b610043610075565b60405161005091906100ca565b60405180910390f35b610073600480360381019061006e9190610116565b61007b565b005b60005481565b806000819055507f24a4f809cc1bf5b0f3c16b615535b56a0b583b1630e06e32b46b759b8088a95d60405160405180910390a150565b6000819050919050565b6100c4816100b1565b82525050565b60006020820190506100df60008301846100bb565b92915050565b600080fd5b6100f3816100b1565b81146100fe57600080fd5b50565b600081359050610110816100ea565b92915050565b60006020828403121561012c5761012b6100e5565b5b600061013a84828501610101565b9150509291505056fea26469706673582212204cdfca4a86b326a9bb2935aebaa08119e8b78e35dc36cff4af6ef2d287894d0164736f6c63430008120033\n";

    public static final String FUNC_SET = "set";

    public static final String FUNC_STOREDDATA = "storedData";

    public static final Event SETEVENT_EVENT = new Event("setEvent",
            Arrays.<TypeReference<?>>asList());
    ;

    @Deprecated
    protected Store(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Store(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Store(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Store(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<SetEventEventResponse> getSetEventEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(SETEVENT_EVENT, transactionReceipt);
        ArrayList<SetEventEventResponse> responses = new ArrayList<SetEventEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            SetEventEventResponse typedResponse = new SetEventEventResponse();
            typedResponse.log = eventValues.getLog();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<SetEventEventResponse> setEventEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, SetEventEventResponse>() {
            @Override
            public SetEventEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(SETEVENT_EVENT, log);
                SetEventEventResponse typedResponse = new SetEventEventResponse();
                typedResponse.log = log;
                return typedResponse;
            }
        });
    }

    public Flowable<SetEventEventResponse> setEventEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(SETEVENT_EVENT));
        return setEventEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> set(BigInteger x) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SET,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(x)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> storedData() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_STOREDDATA,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    @Deprecated
    public static Store load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Store(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Store load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Store(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Store load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Store(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Store load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Store(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Store> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Store.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Store> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Store.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<Store> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Store.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Store> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Store.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    public static class SetEventEventResponse extends BaseEventResponse {
    }
}
