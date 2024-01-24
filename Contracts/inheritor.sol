// SPDX-License-Identifier: MIT
pragma solidity 0.8.23; // Lock in Solidity compiler version to make it simple to verify on Etherscan. 

// Deploy contract inheritor to inherit contract templateToInherit. Source: https://solidity-by-example.org/inheritance/

error onlyOwner(); //Custom errors to save gas compared to require.
error etherNotSent();
error timerDidNotRunOut();

contract templateToInherit {

    uint256 public timeLastWithdraw; //Time keeping variable for owner changing if no withdraw is made before time runs out.
    address public owner; // Not constant or immutable [would save gas if either since written in bytecode not storage], since the owner can change for this contract based on a timer.

    constructor() { //Function executes at contract deployment only.
        timeLastWithdraw = block.timestamp; // Record the current Unix time from the block at deployment.
        owner = msg.sender; // Set deployer as owner address. 
    }

    function deposit() public payable {} //Anyone can deposit ETH since this is a payable function. 

    function withdraw() public {
        //Security checks. 
        if(msg.sender != owner){revert onlyOwner();} //Check if caller is owner.
        //State changes. 
        timeLastWithdraw = block.timestamp; // Reset the timer every time the owner calls the contract.
        //Send ether at the end of all state changes to avoid reentrancy risks as a good habit. 
        (bool sentOwner, ) = payable(owner).call{value: address(this).balance}(""); //Send ether with call to avoid gas issues with transfer or send.
        if(sentOwner == false) revert etherNotSent();  //Revert if call to transfer fails
    }

    function setNewOwner(address newOwner) public {
        //Security checks. 
        if(block.timestamp < (timeLastWithdraw + 2628288)){revert timerDidNotRunOut();} //Assume there are 2628288 seconds in a month on average. Source: https://blog.prepscholar.com/how-many-seconds-in-a-day-a-month-a-year
        //State changes. 
        owner = newOwner;
        timeLastWithdraw = block.timestamp; // Reset the timer if we want to allow a new owner if the timer runs out every time.
    }
}

// Contracts inherit other contracts by using the keyword 'is'.
contract inheritor is templateToInherit {}
