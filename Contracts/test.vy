# @version 0.2.16
unixTime: public(uint256) # uint256 storage slot.
owner: public(address) #address owner value (test with 0.2.16 in Remix IDE)
# owner: immutable(address) #address owner value not in storage saves gas (requires Vyper 0.3.0 it seems which)
event updateStorage: # Event with 1 argument. 
    newStorageValue: uint256 # Argument 0 type uint256. 

@external
def __init__(): # Constructor. 
    self.unixTime = block.timestamp # Set storage slot to deployment unix time. 
    self.owner = msg.sender

@external
def updateTime(storageInput: uint256): # Function which sets new storage slot value based on user input uint256 value. 
    if storageInput == self.unixTime: # Check if input value is already set in storage.
        raise"valueSetAlready" # Revert message.
    self.unixTime = storageInput # Set storage value to memory value. 
    log updateStorage(storageInput) # Emit event with user input which changed storage. 

@external
def ownerSetStorageTime(): # Function called by owner which sets storage directly.
    if msg.sender != self.owner: # Check if input value is already set in storage.
        raise"notOwner" # Revert message.
    self.unixTime = block.timestamp # Set storage value to memory value. 
    log updateStorage(block.timestamp) # Emit event with user input which changed storage.