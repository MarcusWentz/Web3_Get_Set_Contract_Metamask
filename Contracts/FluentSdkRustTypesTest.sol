// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IFluentRust {
    // Make sure type interfaces are defined here or else there will be a compiler error.
    function rustString() external view returns (string memory);
    function rustUint256() external view returns (uint256);    
    function rustInt256() external view returns (int256);
    function rustAddress() external view returns (address);
    function rustBytes() external view returns (bytes memory);
    function rustBytes32() external view returns (bytes32);
    function rustBool() external view returns (bool);
}

contract FluentSdkRustTypesTest {
    
    IFluentRust public fluentRust;

    constructor(address FluentRustAddress) {
        fluentRust = IFluentRust(FluentRustAddress);
    }

    function getRustString() external view returns (string memory) {
        string memory rustString = fluentRust.rustString();
        return string(abi.encodePacked(rustString, " World"));
    }

    function getRustUint256() external view returns (uint256) {
        uint256 rustUint256 = fluentRust.rustUint256();
        return rustUint256;
    }

    function getRustInt256() external view returns (int256) {
        int256 rustInt256 = fluentRust.rustInt256();
        return rustInt256;
    }

    function getRustAddress() external view returns (address) {
        address rustAddress = fluentRust.rustAddress();
        return rustAddress;
    }

    function getRustBytes() external view returns (bytes memory) {
        bytes memory rustBytes = fluentRust.rustBytes();
        return rustBytes;
    }

    function getRustBytes32() external view returns (bytes32) {
        bytes32 rustBytes32 = fluentRust.rustBytes32();
        return rustBytes32;
    }

    function getRustBool() external view returns (bool) {
        bool rustBool = fluentRust.rustBool();
        return rustBool;
    }

}
