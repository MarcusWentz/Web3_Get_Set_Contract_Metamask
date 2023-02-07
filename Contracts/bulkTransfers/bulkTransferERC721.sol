// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MultipleShardeumLogosNFT is ERC721URIStorage {

  constructor() ERC721 ("shardeumLogo", "SL"){
    for (uint256 i = 0; i < 6;) {
        _safeMint(msg.sender, i); //Mint NFT with tokenId = 1.
        _setTokenURI(i, "bafybeib6zcl5v5ojxkvmxnvpqrypq5yakmu2fd6y6wc3xo4n66pjelu7yq"); //For tokenId = 1, set IPFS CID for image data.
        unchecked { i += 1; }
    }
  }

}

contract bulkSenderERC721 {

    function bulkTransfer(address nftAddress, address[] calldata toList, uint256[] calldata tokenIds) external {
        for (uint256 i = 0; i < tokenIds.length;) {
            IERC721(nftAddress).safeTransferFrom(msg.sender, toList[i], tokenIds[i]);
            unchecked { i += 1; }
        }
    }

}