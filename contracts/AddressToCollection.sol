// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract AddressToCollection {

  struct addressData {
    bool exists;
    address[] addresses;
  }

  mapping(string => addressData) private addressMapping;

  function getCollections(string memory userAddress) public view returns (address[] memory){
    require(addressMapping[userAddress].exists);
    return addressMapping[userAddress].addresses;
  }

  function addCollection(string memory userAddress, address theAddress) public {
    if (addressMapping[userAddress].exists) {
      addressMapping[userAddress].addresses.push(theAddress);
    } else {
      address[] memory emptyAddressList;
      addressData memory _address = addressData(true, emptyAddressList);
      addressMapping[userAddress] = _address;
      addressMapping[userAddress].addresses.push(theAddress);
    }
  }
}