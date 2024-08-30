// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract forLoopsUncheckedGasBenchmark {

    // Test contract functions based on this Soldity 0.8.22 update Tweet for unchecked for loops:
    // https://x.com/solidity_lang/status/1717213166210588706

    uint256 public value;

    // Remix IDE gas transaction report forLoopsUncheckedGasBenchmark.newFunction():
    // gas	103634 gas
    // transaction cost	90116 gas 
    // execution cost	69052 gas 
    function newFunction() public { 
        for (uint256 i = 0; i < 100; i += 1) {
            value += 1;
        }
    }

    // Remix IDE gas transaction report forLoopsUncheckedGasBenchmark.outdatedFunction():
    // gas 83099 gas
    // transaction cost	72260 gas 
    // execution cost	51196 gas 

    function outdatedFunction() public { 
        for (uint256 i = 0; i < 100;) {
            value += 1;
            unchecked { i += 1; }
        }
    }

}
