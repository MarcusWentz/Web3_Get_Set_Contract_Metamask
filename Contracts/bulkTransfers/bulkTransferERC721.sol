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
        for (uint256 i = 0; i < toList.length;) {
            IERC721(nftAddress).safeTransferFrom(msg.sender, toList[i], tokenIds[i]);
            unchecked { i += 1; }
        }
    }

}

contract burnERC721 is IERC721Receiver { //Betanet 1.X 0x0b0C0C64373B88CCc23f2B8cc73881a0FE38A538

    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

}

//
//(
// 0xaa48eb1D528A492E87eD3529FF2fd21Ca56Ed3c5,
// ["0x66C1d8A5ee726b545576A75380391835F8AAA43c","0xD0E222A8b806E0B7e89dEcDCdFD6F9a2BeA9cdF6","0x0b0C0C64373B88CCc23f2B8cc73881a0FE38A538"],
// [0,1,2]
//)