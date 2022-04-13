// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./MyNFT.sol";

contract AddressToCollection {
    // each organiztion will have a struct to keep track of all their contract addresses and whether they are verified
    struct addressData {
        bool verified;
        address[] addresses;
    }

    address constant ADMIN = 0xf228F1B867445c5cD36e8210aa6EA3608D3D4622;

    // for each organization address, there will be a corresponding addressData struct
    mapping(address => addressData) private addressMapping;

    function verifyOrg(address wallet_address) public {
        //replace this with OnlyOwner after import issue is fixed
        //require(msg.sender ==)
        addressMapping[wallet_address].verified = true;
    }

    //will return all the contract addresses for a organization EOA
    function getCollections() public view returns (address[] memory) {
        require(addressMapping[msg.sender].verified);
        return addressMapping[msg.sender].addresses;
    }

    // will return all the collections for a given address
    function getSomeoneElsesCollection(address wallet_address)
        public
        view
        returns (address[] memory)
    {
        require(addressMapping[wallet_address].verified);
        return addressMapping[wallet_address].addresses;
    }

    //deploys a new NFT Contract (creates collection), and adds the contract address to mapping
    function addCollection(
        string memory collection_name,
        string memory collection_symbol
    ) public {
        //deploys MyNFT.sol and creates a new NFT collection
        MyNFT collection = new MyNFT(collection_name, collection_symbol);

        //only push contract if org is verified
        if (addressMapping[msg.sender].verified) {
            addressMapping[msg.sender].addresses.push(address(collection));
        } else {
            address[] memory emptyAddressList;
            //it is true initially, we should change it to false
            addressData memory _address = addressData(true, emptyAddressList);
            addressMapping[msg.sender] = _address;
            addressMapping[msg.sender].addresses.push(address(collection));
        }
    }
}
