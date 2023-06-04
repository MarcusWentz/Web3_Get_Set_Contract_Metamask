#Run with: nim c -r --verbosity:0 test.nim

#Set the following after you unzip the tar file: 
#export PATH="/usr/bin:$PATH"  
#export PATH="~/nim/nim-1.6.12/bin" 

import ethers #Documentation: https://github.com/status-im/nim-ethers #Install with: nimable install ethers 
import chronos
import std/[os,times,math]

proc testFunction(): Future[int] {.async.} =

    let rpcURL = getEnv("sepoliaInfuraWSS");
    let privateKey = getEnv("devTestnetPrivateKey");
  
    let provider = JsonRpcProvider.new(rpcURL)
    let signer = Wallet.new(privateKey, provider)
    
    let chainId =  await provider.getChainId()
    echo chainId

    type contractSimpleStorage = ref object of Contract
    proc storedData(token: contractSimpleStorage): UInt256 {.contract, view.} # Read function
    proc set(token: contractSimpleStorage, x: UInt256) {.contract.} # Write function
    type setEvent = object of Event # Event defined

    let contractAddress = Address.init("0xBBE97Afb978E19033e0BDa692E6034F5b3B91312")
    echo contractAddress.get()
   
    let contractInstance = contractSimpleStorage.new(contractAddress.get(), signer)

    let storedDataValue = await contractInstance.storedData()
    echo storedDataValue

    proc eventListener(setEvent: setEvent) =
        echo "EVENT DETECTED!"
        
    let eventSubscription = await contractInstance.subscribe(setEvent, eventListener)
    echo eventSubscription.type()
    echo "LISTENING FOR EVENTS..."

    let timeNowRoundDown = int(floor(epochTime()))
    echo timeNowRoundDown
    await contractInstance.set(timeNowRoundDown.u256)

    return 1

echo waitFor testFunction()
runForever()