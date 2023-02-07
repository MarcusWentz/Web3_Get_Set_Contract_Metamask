// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract PortalCube is ERC721URIStorage {

  constructor() ERC721 ("PortalCube", "PC"){
    for (uint256 i = 0; i < 6;) {
        _safeMint(msg.sender, i); //Mint NFT with tokenId = 1.
        _setTokenURI(i, "QmPm5L1wzhRUsZ1SYQgtEc1RES8CwaUAAGFg6x76naGdgY"); //For tokenId = 1, set IPFS CID for image data.
        unchecked { i += 1; }
    }
  }

}

contract bulkSenderERC721 { //Approve tokens to this contract for calling safeTransferFrom

    function bulkTransfer(address nftAddress, address[] calldata toList, uint256[] calldata tokenIds) external {
        for (uint256 i = 0; i < tokenIds.length;) {
            IERC721(nftAddress).safeTransferFrom(msg.sender, toList[i], tokenIds[i]);
            unchecked { i += 1; }
        }
    }

}

contract burnERC721 is IERC721Receiver { //0x6a4583868847e0b8B00E367293F5A5443Db8a09c

    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

}

//["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2","0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db","0x6a4583868847e0b8B00E367293F5A5443Db8a09c"]
//[3,4,5]