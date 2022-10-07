// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract contractToCall {

    uint public slot0; //uint is 32 bytes and fills a 32 byte slot. //Do not set 0 manually it wastes gas!

    function set(uint x) public {
        slot0 = x;
    }

}

contract Multicall {

    contractToCall public callContractToCall;

    constructor(address setCallOne) {
        callContractToCall = contractToCall(setCallOne);
    }

    function multiCallRead() public view returns(uint) {
        return callContractToCall.slot0();
    }

    function multiCallWrite(uint x) public {
        callContractToCall.set(x);
    }

}
