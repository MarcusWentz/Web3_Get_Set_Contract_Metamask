// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

error msgValueIncorrect();
error etherNotSent();

contract bulkSender {

    function bulkSend(address[] memory myArray) public payable {
        if(msg.value != (myArray.length * (1 ether)) ) revert msgValueIncorrect();
        for (uint256 i = 0; i < myArray.length;) {
            (bool sent, ) = myArray[i].call{value: 1 ether}("");
            if(sent == false) revert etherNotSent();
            unchecked { i += 1; }
        }
    }
}
