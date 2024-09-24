// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

// Unsigned
import { UD60x18, ud } from "@prb/math/src/UD60x18.sol"; 
// // Signed
// import { SD59x18, sd } from "@prb/math/src/SD59x18.sol";

contract pbrMathLogarithmTesting {

  // For log2 and log10:
  // Min input value for ud(x) is = 1 ether = 1000000000000000000
  // ud(1 ether) = x.log2() = x.log10() = 0
  // Reverts with 999999999999999999

  /// @notice Calculates the binary logarithm of the given signed number.
  function unsignedLog2WithTenEther() external pure returns (UD60x18 result) {
    UD60x18 x = ud(10 ether);
    // Returns 3.321928094887362334 ether, since: 
    // 10 = 2**(3.321928094887362334)
    result = x.log2(); 
  }

  /// @notice Calculates the binary logarithm of the given signed number.
  function unsignedLog10WithTenEther() external pure returns (UD60x18 result) {
    UD60x18 x = ud(10 ether);
    // Returns 1 ether, since: 
    // 10 = 10**(1).
    result = x.log10(); 
  }

  function unsignedLnWithEulersNumber() external pure returns (UD60x18 result) {
    UD60x18 x = ud(2718281828459045260);
    // Returns 1 ether, since: 
    // e = e**(1) 
    // which is rougly about: 
    // 2.718281828459045260**(1).
    result = x.ln(); 
  }

  /// @notice Calculates the log base 2 for the given signed number.
  function unsignedLog2(UD60x18 x) external pure returns (UD60x18 result) {
    result = x.log2();
  }

  /// @notice Calculates the log base 10 for the given signed number.
  function unsignedLn(UD60x18 x) external pure returns (UD60x18 result) {
    result = x.ln();
  }

  /// @notice Calculates the log base 10 for the given signed number.
  function unsignedLog10(UD60x18 x) external pure returns (UD60x18 result) {
    result = x.log10();
  }

}
