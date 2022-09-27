// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is ERC20{

    address immutable Owner;

    constructor() ERC20("Tether USD","USDT") {
        Owner = msg.sender;
        _mint(Owner, (50*(10**9))*(1 ether));
    }

}

contract USDC is ERC20{

    address immutable Owner;

    constructor() ERC20("USD Coin","USDC") {
        Owner = msg.sender;
        _mint(Owner, (50*(10**9))*(1 ether));
    }

}
