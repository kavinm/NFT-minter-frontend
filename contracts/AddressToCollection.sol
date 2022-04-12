// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./MyNFT.sol";

contract AddressToCollection {

  struct addressData {
    bool exists;
    address[] addresses;
  }

  mapping(address => addressData) private addressMapping;

  function getCollections() public view returns (address[] memory){
    require(addressMapping[msg.sender].exists);
    return addressMapping[msg.sender].addresses;
  }

  function getSomeoneElsesCollection(address wallet_address) public view returns (address[] memory) {
    require(addressMapping[wallet_address].exists);
    return addressMapping[wallet_address].addresses;
  }

  function addCollection(string memory collection_name, string memory collection_symbol) public {

    MyNFT collection = new MyNFT(collection_name, collection_symbol);

    if (addressMapping[msg.sender].exists) {
      addressMapping[msg.sender].addresses.push(address(collection));
    } else {
      address[] memory emptyAddressList;
      addressData memory _address = addressData(true, emptyAddressList);
      addressMapping[msg.sender] = _address;
      addressMapping[msg.sender].addresses.push(address(collection));
    }
  }
}