#Run with: //nim c -r --verbosity:0 test.nim

#Set the following after you unzip the tar file: 
#export PATH="/usr/bin:$PATH"  
#export PATH="~/nim/nim-1.6.12/bin" 

import ethers #nimable install ethers
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

    return 1

echo waitFor testFunction() # prints "1"