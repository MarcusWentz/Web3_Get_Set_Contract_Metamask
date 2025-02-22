// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IFluentRust {
    // Make sure type interfaces are defined here or else there will be a compiler error.
    function rustLnUint256() external view returns (uint256);    
    function rustLog10Uint256() external view returns (uint256);    
    function rustLog2Uint256() external view returns (uint256);    
    function rustSqrtUint256() external view returns (uint256);    
    function rustExpUint256() external view returns (uint256);    
}

contract FluentSdkRustPrbMathTestValues {
    
    IFluentRust public fluentRust;

    constructor(address FluentRustAddress) {
        fluentRust = IFluentRust(FluentRustAddress);
    }

    function getRustLnUint256() external view returns (uint256) {
        uint256 rustUint256 = fluentRust.rustLnUint256();
        return rustUint256;
    }

    function getRustLog10Uint256() external view returns (uint256) {
        uint256 rustUint256 = fluentRust.rustLog10Uint256();
        return rustUint256;
    }

    function getRustLog2Uint256() external view returns (uint256) {
        uint256 rustUint256 = fluentRust.rustLog2Uint256();
        return rustUint256;
    }

    function getRustSqrtUint256() external view returns (uint256) {
        uint256 rustUint256 = fluentRust.rustSqrtUint256();
        return rustUint256;
    }

    function getRustExpUint256() external view returns (uint256) {
        uint256 rustUint256 = fluentRust.rustExpUint256();
        return rustUint256;
    }

}
