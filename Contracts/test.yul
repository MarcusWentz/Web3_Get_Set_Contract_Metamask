// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract simpleStorage {

    uint256 public storedData; //Do not set 0 manually it wastes gas!
    // address public immutable owner; //CANNOT BE SET IN ASSEMBLY!
    address public owner; 

    event setEvent(); // keccak256(abi.encodePacked(setEvent())) = 0x24a4f809cc1bf5b0f3c16b615535b56a0b583b1630e06e32b46b759b8088a95d

    constructor() {
        assembly {
            sstore(0,1)
            sstore(1,caller())
        }
    }

    function set(uint256 x) public {
        assembly {
            if eq(x,sload(0))  {
                revert(0x00,0x00)
            }
            sstore(0,x) //Record calldata memory value in storage slot 0.  
            log1(0, 0, 0x24a4f809cc1bf5b0f3c16b615535b56a0b583b1630e06e32b46b759b8088a95d) //Offset, Size, eventStringHash. log2 to log4 allow for more indexed topics.
        
        }
    }

    function ownerSet() public {
        assembly {
            //Remix IDE: 25098 gas
            // Optimized since we don't use NOT or AND masking logic, meaning less opcode. However, this does not follow the design pattern "if true then revert" design pattern which is harder to read and could lead to security issues.
            if eq(caller() , sload(1)) {
                sstore(0,timestamp()) //Record calldata memory value in storage slot 0.  
                log1(0, 0, 0x24a4f809cc1bf5b0f3c16b615535b56a0b583b1630e06e32b46b759b8088a95d) //Offset, Size, eventStringHash. log2 to log4 allow for more indexed topics.
                stop() //STOP THE PROGRAM COUNTER BEFORE HITTING REVERT WHEN YOU LEAVE OUT OF THIS IF BRANCH WE JUMPED INTO.
            }
            revert(0x00,0x00)

            // //Remix IDE: 25135 gas
            // //Path which uses "!=" logic and follows design pattern "if true then revert".
            // let ownerCheck := eq( caller() , sload(1) ) //RECORD THE ADDRESS EQUAL RESULT.
            // let ownerLogicInvertAllBits := not(ownerCheck) //INVERTS ALL 256 BITS ON THE STACK.
            // let ownerLogicInvertMasked := and(1,ownerLogicInvertAllBits) //AND MASK EVERY BIT EXCEPT FOR THE FIRST BIT.

            // // sstore(0,ownerLogicInvertMasked) //Record calldata memory value in storage slot 0.  

            // if ownerLogicInvertMasked {
            //     revert(0x00,0x00)
            // }
            // sstore(0,timestamp()) //Record calldata memory value in storage slot 0.  
            // log1(0, 0, 0x24a4f809cc1bf5b0f3c16b615535b56a0b583b1630e06e32b46b759b8088a95d) //Offset, Size, eventStringHash. log2 to log4 allow for more indexed topics.
        }
    }

}
