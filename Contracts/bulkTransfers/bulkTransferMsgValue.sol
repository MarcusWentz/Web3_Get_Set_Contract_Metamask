// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract bulkSender {

    function bulkSend(address[] memory myArray) public payable {
        for (uint256 i = 0; i < myArray.length;) {
            payable(myArray[i]).transfer(1 ether);
            unchecked { i += 1; }
        }
    }
}