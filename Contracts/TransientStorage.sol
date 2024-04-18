// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract ReentrancyGuardTransient {

    bytes32 constant SLOT = 0; 

    modifier lock() {
        assembly {
            if tload(SLOT) { revert(0, 0) }
            tstore(SLOT, 1)
        }
        _;
        assembly {
            tstore(SLOT, 0)
        }
    }
    
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public lock {
        uint256 bal = balances[msg.sender];
        require(bal > 0);

        //REENTRANCY ATTACK VECTOR. NEED TO USE THE LOCK MODIFIER TO PREVENT REENTRANCY. OTHERWISE UPDATE BALANCES BEFORE SENDING ETHER.
        (bool sent,) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        //SHOULD UPDATE BALANCES BEFORE SENDING ETHER, BUT IT PLACED AFTER TO TEST THE LOCK MODIFIER. 
        balances[msg.sender] = 0;
    }

}

contract Attack {
    ReentrancyGuardTransient public etherStore;
    uint256 public constant AMOUNT = 1 ether;

    constructor(address _etherStoreAddress) {
        etherStore = ReentrancyGuardTransient(_etherStoreAddress);
    }

    // Fallback is called when EtherStore sends Ether to this contract.
    fallback() external payable {
        if (address(etherStore).balance >= AMOUNT) {
            etherStore.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= AMOUNT);
        etherStore.deposit{value: AMOUNT}();
        etherStore.withdraw();
    }

}
