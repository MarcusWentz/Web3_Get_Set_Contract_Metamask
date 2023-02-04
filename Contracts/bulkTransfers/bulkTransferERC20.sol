// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BulkAirDropToken is ERC20 {

    address immutable Owner;

    constructor() ERC20("BulkAirDrop","BAD") {
        Owner = msg.sender;
        _mint(Owner,(1000000000)*(1 ether) );
    }
   
}

contract bulkSenderERC20 {

    function bulkSend(address tokenAddress, address[] memory myArray) public { 
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), myArray.length*(1 ether)); //MAKE SURE YOU APPROVE ENOUGH TOKENS TO PAY EACH USER 1 ETHER TOKENS!
        for (uint256 i = 0; i < myArray.length;) {
            IERC20(tokenAddress).transfer(myArray[i],1 ether);
            unchecked { i += 1; }
        }
    }

}