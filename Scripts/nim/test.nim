#Run with: nim c -r --verbosity:0 test.nim

#Set the following after you unzip the tar file: 
#export PATH="/usr/bin:$PATH"  
#export PATH="~/nim/nim-1.6.12/bin" 

import ethers #Documentation: https://github.com/status-im/nim-ethers #Install with: nimable install ethers 
import chronos
import std/[os,times,math]

proc testFunction(): Future[int] {.async.} =
    #await sleepAsync(100.milliseconds)
    let rpcURL = getEnv("sepoliaInfuraWSS");
    let privateKey = getEnv("devTestnetPrivateKey");
  
    let provider = JsonRpcProvider.new(rpcURL)
    let signer = Wallet.new(privateKey, provider)
    
    # echo provider.type()
    # let accounts = await provider.listAccounts()
    # echo accounts.type()

    let chainId =  await provider.getChainId()
    echo chainId

    type contractSimpleStorage = ref object of Contract
    proc storedData(token: contractSimpleStorage): UInt256 {.contract, view.} # Read function
    proc set(token: contractSimpleStorage, x: UInt256) {.contract.} # Write function
    type setEvent = object of Event # Event defined

    let contractAddress = Address.init("0xBBE97Afb978E19033e0BDa692E6034F5b3B91312")
    echo contractAddress.get()
   
    # let contractInstance = contractSimpleStorage.new(contractAddress.get(), provider)
    let contractInstance = contractSimpleStorage.new(contractAddress.get(), signer)

    let storedDataValue = await contractInstance.storedData()
    echo storedDataValue

    let timeNowRoundDown = int(floor(epochTime()))
    echo timeNowRoundDown
    await contractInstance.set(timeNowRoundDown.u256)

    # proc handleTransfer(setEvent: setEvent) =
    #     echo "received transfer: ", setEvent

    #     let subscription = await token.subscribe(Transfer, handleTransfer)

    return 1

echo waitFor testFunction() # prints "1"