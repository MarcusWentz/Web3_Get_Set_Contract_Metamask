// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract EventCounter {
    uint256 public storedData; //Do not set 0 manually it wastes gas!

    event eventCounter(uint256 indexed a, uint256 indexed b, uint256 indexed c, uint256 d, uint256 e, uint256 f);

    function set(uint256 x) public {
        storedData = x;
        emit eventCounter(x,x+1,x+2,x+3,x+4,x+5);
    }

}