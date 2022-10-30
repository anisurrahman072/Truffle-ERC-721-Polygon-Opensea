// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract GameItem is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // set contract name and ticker.
    constructor() ERC721("Contract Name", "TIC") {}

    //get the current supply of tokens
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // for opensea collection
    // ################## CHANGE: Added the ipfs json URI in return section in bellow contractURI() ##################
    // ################## CHANGE: Added the ipfs json URI in return section in bellow contractURI() ##################
    function contractURI() public pure returns (string memory) {
        return
            "https://ipfs.io/ipfs/bafyreickbvarkerkn5edswktm5n7yphdjnfozkm7lcaxlenfxh64m46gke/metadata.json";
    }

    function mintItem(address player, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
