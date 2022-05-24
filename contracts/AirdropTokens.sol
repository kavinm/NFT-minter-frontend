
pragma solidity ^0.8.0;

interface IERC721 {
    function balanceOf(address account) external view returns (uint256);
    function safeTransferFrom(address from, address to, uint256 tokenID) external;
}

interface IERC1155 {
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
}

contract AirdropTokens {

    function AirdropERC721(IERC721 _token, address _to, uint256 _id) public {
            _token.safeTransferFrom(msg.sender, _to, _id);
    }

    function AirdropERC721(IERC721 _token, address[] calldata _to, uint256[] calldata _id) public {
        
        for (uint256 i = 0; i <_to.length; i++) {
            _token.safeTransferFrom(msg.sender, _to[i], _id[i]);
        }
    }

    function AirdropERC1155(IERC1155 _token, address[] calldata _to, uint256[] calldata _id) public {
        
        for (uint256 i = 0; i <_to.length; i++) {
            _token.safeTransferFrom(msg.sender, _to[i], _id[i], 1, ""); //is "" the meta data
        }
    }
}
