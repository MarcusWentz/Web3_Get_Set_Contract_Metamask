// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract SimpleStorage {
    uint public storedData; //Do not set 0 manually it wastes gas!
    
    event setValueUpdatedViaWebjs(
        uint indexed date,
        address indexed from,
        uint valueChangeEventWenjs
    );

    function set(uint x) public {
        storedData = x;
        emit setValueUpdatedViaWebjs(block.number, msg.sender, x);
    }
    
}
