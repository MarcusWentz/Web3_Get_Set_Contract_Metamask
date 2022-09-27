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

    receive() external payable {
        multicallDeposit();
    }

    fallback() external payable {
        multicallDeposit();
    }

    constructor() {
        WSHM = interfaceWSHM(0x8d05ec01eFb626c638419387F59aed09F8FB84f0); // WSHM Liberty 2.0 address.
    }

    function multicallDeposit() public payable {
        WSHM.deposit{value: msg.value}();
        WSHM.transfer(msg.sender, msg.value);
    }

    function multicallWithdraw(address approvedAddress, uint256 amount) public {
        WSHM.transferFrom(approvedAddress,address(this),amount);
        WSHM.withdraw(amount);
        payable(msg.sender).transfer(address(this).balance);
    }

}
