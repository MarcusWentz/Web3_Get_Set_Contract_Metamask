// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface interfaceWSHM {

    function transfer(address dst, uint wad) external returns (bool);

    function transferFrom(address src, address dst, uint wad) external returns (bool);

    function withdraw(uint wad) external;

    function deposit() external payable;

}

contract multicallWSHM {

    interfaceWSHM public WSHM;

    receive() external payable {}

    fallback() external payable {}

    constructor() {
        WSHM = interfaceWSHM(0xa80d5d2C8Cc0d06fBC1F1A89A05d76f86082C20e); // WSHM Liberty 2.0 address.
    }

    function multicallDeposit() public payable {
        WSHM.deposit{value: msg.value}();
        WSHM.transfer(msg.sender, msg.value);
    }

    function multicallWithdraw(uint256 amount) public {
        WSHM.transferFrom(msg.sender,address(this),amount);
        WSHM.withdraw(amount);
        payable(msg.sender).transfer(address(this).balance);
    }

}
