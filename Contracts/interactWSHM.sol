// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface interfaceWSHM {

    function transfer(address dst, uint wad) external returns (bool);

    function transferFrom(address src, address dst, uint wad) external returns (bool);

    function withdraw(uint wad) external;

    function deposit() external payable;

}

contract interactWSHM {

    interfaceWSHM public WSHM;

    receive() external payable {}

    fallback() external payable {}

    constructor() {
        WSHM = interfaceWSHM(0x22AB9aC0b9290a09B1d3fd44E7Ae61021Fcbd8B1); // WSHM Liberty 2.0 address.
    }

    function multicallDeposit() public payable {
        WSHM.deposit{value: msg.value}();
        WSHM.transfer(msg.sender, msg.value);
    }

    function test() public payable {
    }

    function multicallWithdraw(uint256 amount) public {
        WSHM.transferFrom(msg.sender,address(this),amount);
        WSHM.withdraw(amount);
        payable(msg.sender).transfer(address(this).balance);
    }

}
