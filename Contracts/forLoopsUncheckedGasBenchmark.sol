// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract forLoopsUncheckedGasBenchmark {

    // Test contract functions based on this Soldity 0.8.22 update Tweet for unchecked for loops:
    // https://x.com/solidity_lang/status/1717213166210588706
    // Detailed for loop unchecked gas optimization here:
    // https://soliditylang.org/blog/2023/10/25/solidity-0.8.22-release-announcement/
    // Prefix vs Postfix increment (prefix ++i is the same as i += 1 with the return value update happening in that expression);
    // https://ethereum.stackexchange.com/questions/102006/is-there-a-difference-between-prefix-and-postfix-increment-in-solidity

    uint256 public value;

    // Remix IDE gas transaction report forLoopsUncheckedGasBenchmark.newFunctionRawEquation():
    // gas	103684 gas
    // transaction cost	90160 gas 
    // execution cost	69096 gas 
    function newFunctionRawEquation() public { 
        for (uint256 i = 0; i < 100; i += 1) {
            value += 1;
        }
    }

    // Remix IDE gas transaction report forLoopsUncheckedGasBenchmark.newFunctionPrefixIncrement():
    // gas	83150 gas
    // transaction cost	72304 gas 
    // execution cost	51240 gas 
    function newFunctionPrefixIncrement() public { 
        for (uint256 i = 0; i < 100; ++i) {
            value += 1;
        }
    }

    // Remix IDE gas transaction report forLoopsUncheckedGasBenchmark.outdatedFunctionPrefixIncrement():
    // gas	83125 gas
    // transaction cost	72282 gas 
    // execution cost	51218 gas 
    function outdatedFunctionPrefixIncrement() public { 
        for (uint256 i = 0; i < 100;) {
            value += 1;
            unchecked { ++i; }
        }
    }

    // Remix IDE gas transaction report forLoopsUncheckedGasBenchmark.outdatedFunctionRawEquation():
    // gas	83049 gas
    // transaction cost	72216 gas 
    // execution cost	51152 gas 
    function outdatedFunctionRawEquation() public { 
        for (uint256 i = 0; i < 100;) {
            value += 1;
            unchecked { i += 1; }
        }
    }

}
