// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

// Unsigned
import { UD60x18 } from "@prb/math/src/UD60x18.sol"; 
// // Signed
// import { SD59x18 } from "@prb/math/src/SD59x18.sol";

contract prbMathLogarithmTesting {

  // For log10, ln and log2:
  // Min input value for ud(x) is = 1 ether = 1000000000000000000
  // ud(1 ether) =  x.log10() = x.ln() = x.log2() = 0
  // Reverts with 999999999999999999

  /// @notice Calculates the binary logarithm of the given signed number.
  function unsignedLog10WithTenEtherRawValue() external pure returns (UD60x18 result) {
    UD60x18 x = UD60x18.wrap(10 ether);
    // Returns 1 ether, since: 
    // 10 = 10**(1).
    result = x.log10(); 
  }

  /// @notice Calculates the binary logarithm of the given signed number.
  function unsignedLog10WithTenEtherReturnUint256() external pure returns (uint256 result) {
    UD60x18 x = UD60x18.wrap(10 ether);
    // Returns 1 ether, since: 
    // 10 = 10**(1).
    UD60x18 log10RawValue = x.log10(); 
    result = log10RawValue.unwrap();
  }

  /// @notice Calculates the binary logarithm of the given signed number.
  function unsignedLog2WithTenEther() external pure returns (UD60x18 result) {
    UD60x18 x = UD60x18.wrap(10 ether);
    // Returns 3.321928094887362334 ether, since: 
    // 10 = 2**(3.321928094887362334)
    result = x.log2(); 
  }

  /// @notice Calculates the binary logarithm of the given signed number.
  function unsignedLog2WithTwoEther() external pure returns (UD60x18 result) {
    UD60x18 x = UD60x18.wrap(2 ether);
    // Returns 1 ether, since: 
    // 2 = 2**(1)
    result = x.log2(); 
  }

  function unsignedLnWithEulersNumber() external pure returns (UD60x18 result) {
    UD60x18 x = UD60x18.wrap(2718281828459045260);
    // Returns 1 ether, since: 
    // e = e**(1) 
    // which is rougly about: 
    // 2.718281828459045260**(1).
    result = x.ln(); 
  }

  /// @notice Calculates the log base 10 for the given signed number.
  // Slowest growth logarithm function in pbr-math.
  function unsignedLog10(UD60x18 x) external pure returns (UD60x18 result) {
    result = x.log10();
  }

  /// @notice Calculates the log base e for the given signed number.
  // Slower growth than log2 but faster than log10 in pbr-math.
  function unsignedLn(UD60x18 x) external pure returns (UD60x18 result) {
    result = x.ln();
  }

  /// @notice Calculates the log base 2 for the given signed number.
  // Fastest growth logarithm function in pbr-math.
  // Slower than the square root function in pbr-math.
  function unsignedLog2(UD60x18 x) external pure returns (UD60x18 result) {
    result = x.log2();
  }

}
