#Run with: //nim c -r --verbosity:0 test.nim

#Set the following after you unzip the tar file: 
#export PATH="/usr/bin:$PATH"  
#export PATH="~/nim/nim-1.6.12/bin" 

import ethers #Documentation: https://github.com/status-im/nim-ethers #Install with: nimable install ethers 
import chronos
import os

proc testFunction(): Future[int] {.async.} =
    #await sleepAsync(100.milliseconds)
    let rpcURL = getEnv("sepoliaInfuraWSS");
    let provider = JsonRpcProvider.new(rpcURL)
    echo provider.type()
    let accounts = await provider.listAccounts()
    echo accounts.type()
    let chainId =  await provider.getChainId()
    echo chainId

    type contractSimpleStorage = ref object of Contract
    proc storedData(token: contractSimpleStorage): UInt256 {.contract, view.}

    let contractAddress = Address.init("0xBBE97Afb978E19033e0BDa692E6034F5b3B91312")
    echo contractAddress.get()
   
    let contractInstance = contractSimpleStorage.new(contractAddress.get(), provider)

    let storedDataValue = await contractInstance.storedData()
    echo storedDataValue



    return 1

echo waitFor testFunction() # prints "1"