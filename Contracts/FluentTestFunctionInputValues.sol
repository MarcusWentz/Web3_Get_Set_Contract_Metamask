// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

interface IFluentRust {
    function rustSqrtUint128(uint128 input) external view returns (uint128);    
}

contract FluentTestFunctionInputValues {
    
    IFluentRust public fluentRust;

    constructor(address FluentRustAddress) {
        fluentRust = IFluentRust(FluentRustAddress);
    }

    function getRustSqrtUint128(uint128 input) external view returns (uint128) {
        uint128 rustUint128 = fluentRust.rustSqrtUint128(input);
        return rustUint128;
    }

}
