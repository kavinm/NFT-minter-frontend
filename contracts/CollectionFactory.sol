// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./SFT.sol";

contract CollectionFactory {

    event ContractCreated(
        address indexed user,
        address generatedContract
    );


    function createNewContract() public {
        SFT instanceOf1155 = new SFT("");
        emit ContractCreated(msg.sender, address(instanceOf1155));
    }

    function multiMint(address[] memory listOfEmployees, string memory token_uri, uint256 id, address collectionAddress) public {

        SFT sftInstance = SFT(collectionAddress);
        sftInstance.setURI(id, token_uri);
        for (uint i = 0; i < listOfEmployees.length; i++) {
            sftInstance.mint(listOfEmployees[i], id, 1);
        }
    }

}
