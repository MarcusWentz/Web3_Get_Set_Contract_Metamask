// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

// Unsigned
import { UD60x18, ud } from "@prb/math/src/UD60x18.sol"; 
// // Signed
// import { SD59x18, sd } from "@prb/math/src/SD59x18.sol";

contract pbrMathSquareRootTesting {

  /// @notice Calculates the square root for the given signed number.
  function unsignedSquareRootTestSmallValue() external pure returns (UD60x18 result) {
    // 1 wei in uint256 is actually 1 ether in UD60x18 fixed point types.
    UD60x18 x = ud(1);
    // Returns 1000000000, since: 
    // 1 ether = 10**18 = (10**9)**2
    result = x.sqrt(); 
  }

  /// @notice Calculates the square root for the given signed number.
  function unsignedSquareRoot(UD60x18 x) external pure returns (UD60x18 result) {
    result = x.sqrt();
  }

}
