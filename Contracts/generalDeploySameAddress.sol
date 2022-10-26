// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error notOwner();

contract ContractToDeploy { //Bytecode matches creation code with no constructor input arguments. Bytecode with Vitalik address as owner (get this from Remix IDE bytecode object and add 0x prefix): 
                            //0x60a060405234801561001057600080fd5b5073d8da6bf26964af9d7eed9e03e53415d37aa9604573ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250506080516102a96100796000396000818160bb015260df01526102a96000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806321cf146c14610051578063b4a99a4e1461006f578063f81bfa3f1461008d578063f965e32e14610097575b600080fd5b6100596100b3565b604051610066919061019e565b60405180910390f35b6100776100b9565b60405161008491906101fa565b60405180910390f35b6100956100dd565b005b6100b160048036038101906100ac9190610246565b61017b565b005b60005481565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610162576040517f251c9d6300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff16ff5b8060008190555050565b6000819050919050565b61019881610185565b82525050565b60006020820190506101b3600083018461018f565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101e4826101b9565b9050919050565b6101f4816101d9565b82525050565b600060208201905061020f60008301846101eb565b92915050565b600080fd5b61022381610185565b811461022e57600080fd5b50565b6000813590506102408161021a565b92915050565b60006020828403121561025c5761025b610215565b5b600061026a84828501610231565b9150509291505056fea26469706673582212205df050973a2ebeb4658c2e7576694ead468556acba75be1453a68112abea99e364736f6c63430008110033
    uint public storageSlot0;
    address public immutable Owner;
    
    constructor() { // Put your address as Owner instead of msg.sender because msg.sender will be another contract with CREATE2 salt deploy.
        Owner = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4; // Default address in Remix IDE VM. 
    }                                                       // Do not do tx.origin because someone can front run you during contract creation!

    function changeValue(uint updateStorageSlot) public {
        storageSlot0 = updateStorageSlot;
    }

    function killThisContract() public { //After a contract is killed at an address, you can deploy another contract at that address.
        if(msg.sender != Owner) { revert notOwner(); }
        selfdestruct(payable(Owner)); //Deletes all data from this contract address. Address inside selfdestruct call gets all ether in the contract self destructing. 
    }

}

contract Create2Factory {

    function generalDeployCreate2(uint _salt, bytes memory creationCode) public { // BYTECODE NEEDS TO HAVE "0X" PREFIX TO BUILD RLP!
        address addrMsgValueZero;     // Salt example:         0x0000000000000000000000000000000000000000000000000000000000000000
        assembly {                    // Another salt example: 0x123456789abcdef0000000000000000000000000000000000000000000000000
            addrMsgValueZero := create2(0, add(creationCode, 0x20), mload(creationCode), _salt) //callvalue() is the same as msg.value in assembly. callvalue() == 0 to save gas since the constructor and this create2 function are not payable.
            if iszero(extcodesize(addrMsgValueZero)) { //Note: constructor is not payable and takes no input variables (hardcoded in) to keep the creation code simple for this example.
                revert(0, 0)                           
            }
        }
    }

    function generalPrecomputeAddress(uint _salt, bytes memory creationCode) public view returns (address) { // BYTECODE NEEDS TO HAVE "0X" PREFIX TO BUILD RLP!
        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(this), _salt, keccak256(creationCode)));
        return address(uint160(uint(hash)));
    }

}

