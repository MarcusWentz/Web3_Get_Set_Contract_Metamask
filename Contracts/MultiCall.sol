// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract One {
    uint public slot0; //uint is 32 bytes and fills a 32 byte slot. //Do not set 0 manually it wastes gas!

    function set(uint x) public {
        slot0 = x;
    }

}

contract Two {
    uint public slot0;  //uint is 32 bytes and fills a 32 byte slot. //Do not set 0 manually it wastes gas!
    uint public slot1;  //uint is 32 bytes and fills a 32 byte slot. //Do not set 0 manually it wastes gas!

    function setSlot(uint x, uint slot) public {
        if(slot == 1){
            slot1 = x;
        } else{
            slot0 = x;
        }
    }

}

contract Multicall {
    uint public slot0;  //uint is 32 bytes and fills a 32 byte slot. //Do not set 0 manually it wastes gas!
    uint public slot1;  //uint is 32 bytes and fills a 32 byte slot. //Do not set 0 manually it wastes gas!
    uint public slot2;  //uint is 32 bytes and fills a 32 byte slot. //Do not set 0 manually it wastes gas!

    One public callContractOne; 
    Two public callContractTwo; 

    constructor(address setCallOne, address setCallTwo) {
        callContractOne = One(setCallOne); 
        callContractTwo = Two(setCallTwo); 
    }

    function multiCall(uint x) public {
        slot2 = x;                      //Multicall slot2.
        callContractOne.set(x);         //callContractOne slot0.
        callContractTwo.setSlot(x,1);   //callContractTwo slot1.
    }

}
