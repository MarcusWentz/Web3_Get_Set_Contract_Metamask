// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract addressCodeHash { //From https://soliditydeveloper.com/extcodehash

    function getCodeHash(address account) public view returns (bytes32) {

        bytes32 codeHash;
        assembly { codeHash := extcodehash(account) }

        return (codeHash);
    }

    function isContractBasedOnHash(address account) public view returns (bool) {
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;

        bytes32 codeHash;
        assembly { codeHash := extcodehash(account) }

        return (codeHash != accountHash && codeHash != 0x0);
    }

    function isContractBasedOnSize(address addr) public view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }


}
