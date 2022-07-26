// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract SimpleStorage {
    uint public storedData; //Do not set 0 manually it wastes gas!

    event setEvent();

    function set(uint x) public {
        storedData = x;
        emit setEvent();
    }

}
