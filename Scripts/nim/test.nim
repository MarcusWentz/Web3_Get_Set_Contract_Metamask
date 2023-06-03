#Run with: //nim c -r --verbosity:0 test.nim

#Set the following after you unzip the tar file: 
#export PATH="/usr/bin:$PATH"  
#export PATH="~/nim/nim-1.6.12/bin" 

import ethers #nimable install ethers
import chronos

proc testFunction(): Future[int] {.async.} =
    #await sleepAsync(100.milliseconds)
    let provider = JsonRpcProvider.new("https://endpoints.omniatech.io/v1/eth/sepolia/public")
    echo provider.type()
    let accounts = await provider.listAccounts()
    echo accounts.type()
    let chainId =  await provider.getChainId()
    echo chainId
    return 1

echo waitFor testFunction() # prints "1"