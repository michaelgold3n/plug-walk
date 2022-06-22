// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error Error__ImageNotAdded();
error Error__UnauthorizedUser();

contract StateImages is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) public stateNftToImageId;
    mapping(uint256 => address) public stateNftOwner;

    event imageAdded(uint256 indexed stateNftId);
    event imageUpdated(uint256 indexed stateNftId);

    constructor() ERC721("StateImage", "SIM") {
        _tokenIds.increment(); // 0
    }

    modifier nftOwner(uint256 stateNftId) {
        if (stateNftOwner[stateNftId] != msg.sender) {
            revert Error__UnauthorizedUser();
        }

        _;
    }

    function addImage(uint256 stateNftId, string memory imageURL)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        stateNftToImageId[stateNftId] = newItemId;
        stateNftOwner[stateNftId] = msg.sender;
        _setTokenURI(newItemId, imageURL);

        _tokenIds.increment();

        emit imageAdded(stateNftId);
        return newItemId;
    }

    function updateImage(uint256 stateNftId, string memory imageURL)
        public
        nftOwner(stateNftId)
    {
        uint256 tokenId = stateNftToImageId[stateNftId];
        _setTokenURI(tokenId, imageURL);

        emit imageUpdated(stateNftId);
    }

    function getStateNftToTokenURI(uint256 stateNftId)
        public
        view
        returns (string memory)
    {
        if (stateNftToImageId[stateNftId] == 0) {
            revert Error__ImageNotAdded();
        }

        uint256 tokenId = stateNftToImageId[stateNftId];
        return tokenURI(tokenId);
    }
}
