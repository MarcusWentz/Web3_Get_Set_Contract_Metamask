// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error notOwner();
error msgValueNotOneEther();

contract ContractToDeploy {

    uint public storageSlot0;
    address public immutable Owner;

    constructor(uint inputValueDeployed) payable {
        if(msg.value != 1 ether) { revert msgValueNotOneEther(); }
        Owner = msg.sender;
        storageSlot0 = inputValueDeployed;
    }
    
    function changeValue(uint updatedValue) public {
        storageSlot0 = updatedValue;
    }

    function killThisContract() public {
        if(msg.sender != Owner) { revert notOwner(); }
        payable(Owner).transfer(address(this).balance);
        selfdestruct(payable(address(this))); //Deletes all data from contract.
    }

}

contract Create2Factory { //Modified from: "Create2 | Solidity 0.8" by  Smart Contract Programmer https://www.youtube.com/watch?v=883-koWrsO4&ab_channel=SmartContractProgrammer

    function create2(bytes32 _salt, uint inputValueDeployed) public payable {
        if(msg.value != 1 ether) { revert msgValueNotOneEther(); }
        new ContractToDeploy {value: 1 ether, salt: _salt}(inputValueDeployed);
    }

}
