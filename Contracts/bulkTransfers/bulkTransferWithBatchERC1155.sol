// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract MultipleFungibleTokens is ERC1155 { //ERC1155 cannot also be a ERC1155Holder for having tokens ERC1155 tokens sent to it.

    constructor() ERC1155("") { //When using safeTransferFrom, have data as 0x00.
        _mint(msg.sender, 0,    100*(1 ether), "");  //To send tokens from wallet to wallet, send the following Tx to this contract: "setApprovalForAll(walletToSendTo,true)".
        _mint(msg.sender, 1,    100*(1 ether), "");  //Then you can transfer tokens with: "safeTransferFrom(fromAddress,toAddress,id,amount,0x00)".
        _mint(msg.sender, 2,    100*(1 ether), "");  //Smart contracts must inherit "ERC1155Holder.sol" to receive ERC1155 tokens.
    }

}

contract bulkSenderERC1155 { //Approve tokens to this contract for calling safeTransferFrom

    function bulkTransfer(address nftAddress, address[] calldata toList, uint256[] calldata tokenIds, uint256[] calldata amounts, bytes calldata data) external {
        for (uint256 i = 0; i < toList.length;) {
            IERC1155(nftAddress).safeBatchTransferFrom(msg.sender, toList[i], tokenIds, amounts, data);
            unchecked { i += 1; }
        }
    }

}

contract BurnTokensERC1155 is ERC1155Holder {} 

//Test inputs:

//setApprovalForAll(addressBulkSenderERC1155,true)

//Betanet 1.X
//(
// addressBulkSenderERC1155
// ["0x66C1d8A5ee726b545576A75380391835F8AAA43c","0xD0E222A8b806E0B7e89dEcDCdFD6F9a2BeA9cdF6",addressBurnTokensERC1155],
// ["0","1","2"]
// ["1000000000000000000","2000000000000000000","3000000000000000000"],
// "0x"
//)

//Remix VM Test:

//setApprovalForAll(0xE3Ca443c9fd7AF40A2B5a95d43207E763e56005F,true)

//(
// 0xE3Ca443c9fd7AF40A2B5a95d43207E763e56005F,
// ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2","0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",0x9a2E12340354d2532b4247da3704D2A5d73Bd189],
// ["0","1","2"]
// ["1000000000000000000","2000000000000000000","3000000000000000000"],
// "0x"
//)



