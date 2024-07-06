// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract SimpleStorage {
    uint256 public storedData; //Do not set 0 manually it wastes gas!

    event setEvent();
    

    function set(uint256 x) public {
        storedData = x;
        emit setEvent();
    }

}
