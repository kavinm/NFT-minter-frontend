// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./SFT.sol";

contract SFTFactory {

    function multiMint(address[] memory listOfEmployees, string memory token_uri) public returns (address) {
        SFT instanceOf1155 = new SFT(token_uri);
        instanceOf1155.setURI(1, token_uri);
        for ( uint i = 0 ;  i < listOfEmployees.length ; i++) {
            instanceOf1155.mint(listOfEmployees[i], 1, 1);
        }

        return address(instanceOf1155);
    }
}
