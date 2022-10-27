// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error notOwner();

contract ContractToDeploy {

    uint public storageSlot0;
    address public immutable Owner;

    constructor(address inputAddress) payable {
        Owner = inputAddress; //Need to put address as input instead of msg.sender because msg.sender will be another contract with CREATE2 salt deploy.
    }
    
    function changeValue(uint updateStorageSlot) public {
        storageSlot0 = updateStorageSlot;
    }

    function killThisContract() public { //After a contract is killed at an address, you can deploy another contract at that address.
        if(msg.sender != Owner) { revert notOwner(); }
        selfdestruct(payable(Owner)); //Deletes all data from this contract.
    }

}

contract Create2Factory { //Modified from: "Create2 | Solidity 0.8" by  Smart Contract Programmer https://www.youtube.com/watch?v=883-koWrsO4&ab_channel=SmartContractProgrammer

    address public lastDeployedAddress;

    function create2(bytes32 _salt, address ownerAddress) public payable { // Salt example:         0x0000000000000000000000000000000000000000000000000000000000000000
        ContractToDeploy deployedAddress = new ContractToDeploy {value: 1 ether, salt: _salt}(ownerAddress);
        lastDeployedAddress = address(deployedAddress);
    }

    function precomputeAddress(uint _salt, address ownerAddress) public view returns (address) {
        bytes memory creationCodeValue = abi.encodePacked(type(ContractToDeploy).creationCode, abi.encode(ownerAddress));
        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(this), _salt, keccak256(creationCodeValue)));
        return address(uint160(uint(hash)));
    }

}
