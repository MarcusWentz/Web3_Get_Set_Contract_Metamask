// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract AssemblyStorage {

    uint public storageSlot0; //Do not set 0 manually it wastes gas!
    uint public storageSlot1; //Do not set 0 manually it wastes gas!

    event setEvent();

    function assemblyStorage(uint x) public {
        assembly {
            sstore(0,x)         //Record memory value in storage slot 0.  
            sstore(1,sload(0))  //Record storage slot 0 to storage slot 1 (costs more gas reading data from storage than data).
        }
        emit setEvent();
    }

}
