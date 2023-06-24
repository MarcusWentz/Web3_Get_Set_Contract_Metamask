// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract SmileDao {

    mapping(address => bool) public smileDaoMember;

    function setMember() public {
        smileDaoMember[msg.sender] = true;
    }

}
