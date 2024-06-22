// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

error etherNotSent();
error amountTooBig();

// Modified from: https://programtheblockchain.com/posts/2018/01/05/writing-a-banking-contract/
contract Bank {

    mapping(address => uint256) public balanceOf;   // Balances, indexed by addresses.

    function deposit() public payable {
        //Effects
        balanceOf[msg.sender] += msg.value;     // Increase the account's balance.
    }

    function withdraw(uint256 amount) public {
        //Checks
        if(amount > balanceOf[msg.sender]) revert amountTooBig();
        //Effects
        balanceOf[msg.sender] -= amount; // Decrease the account's balance BEFORE any external address calls.
        //Interactions
        (bool sent, ) = (msg.sender).call{value: amount}(""); // Externally call the user's address to send Ether.
        if(sent == false) revert etherNotSent(); // Revert if msg.sender is not a payable contract of fails in general.
    }
}
