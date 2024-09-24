// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

// Unsigned
import { UD60x18, ud } from "@prb/math/src/UD60x18.sol"; 
// // Signed
// import { SD59x18, sd } from "@prb/math/src/SD59x18.sol";

contract pbrMathLogarithmTesting {

  /// @notice Calculates the binary logarithm of the given signed number.
  /// @dev Try this with x = 128e18.
  function unsignedLog2WithTenEther() external pure returns (UD60x18 result) {
    UD60x18 x = ud(10 ether);
    // Returns 3.321928094887362334 ether, since: 
    // 10 ether = 2**(3.321928094887362334 ether)
    result = x.log2(); 
  }

  /// @notice Calculates the binary logarithm of the given signed number.
  /// @dev Try this with x = 128e18.
  function unsignedLog10WithTenEther() external pure returns (UD60x18 result) {
    UD60x18 x = ud(10 ether);
    // Returns 1 ether, since: 
    // 10 ether = 10**(1 ether).
    result = x.log10(); 
  }

  /// @notice Calculates the binary logarithm of the given signed number.
  /// @dev Try this with x = 128e18.
  function unsignedLog2(UD60x18 x) external pure returns (UD60x18 result) {
    result = x.log2();
  }

  /// @notice Calculates the binary logarithm of the given signed number.
  /// @dev Try this with x = 128e18.
  function unsignedLog10(UD60x18 x) external pure returns (UD60x18 result) {
    result = x.log10();
  }

}
