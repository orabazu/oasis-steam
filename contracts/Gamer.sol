pragma solidity ^0.8.4;
// SPDX-License-Identifier: GPL-3.0-or-later
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Tile Gamer Contract
 * @dev Main contract for Gamers NFT
 * @author Dominic Leon Hackett
 */

contract Gamer is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    address minter;

    string _uri;

    constructor(address _minter, string memory _metadataURI)
        ERC721("Tile GAMER NFT", "TGMR")
    {
        minter = _minter;
        _uri = _metadataURI;
    }

    function mintNFT(address to) external {
        require(msg.sender == minter, "Unauthorized Minter");
        _tokenIdCounter.increment();

        _safeMint(to, _tokenIdCounter.current());
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return string(abi.encodePacked(_uri));
    }

    function setMinter(address _minter) external onlyOwner {
        minter = _minter;
    }

    function setUri(string memory _metadataURI) external onlyOwner {
        _uri = _metadataURI;
    }
}
