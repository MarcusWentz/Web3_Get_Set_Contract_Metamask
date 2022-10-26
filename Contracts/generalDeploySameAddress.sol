// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract GeneralCreate2Factory {

    function generalDeployCreate2(uint _salt, bytes memory bytecode) external {
        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), _salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
    }

    function generalPrecomputeAddress(uint _salt, bytes memory bytecode) public view returns (address) {
        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(this), _salt, keccak256(bytecode)));
        return address(uint160(uint(hash)));
    }

}
