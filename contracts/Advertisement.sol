pragma solidity  ^0.8.4;
// SPDX-License-Identifier: GPL-3.0-or-later
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Tile Advertisement Contract
 * @dev Main contract for Advertisement NFT 
 * @author Dominic Leon Hackett
 */


contract AdvertisementNFT is  ERC721URIStorage, Ownable {
    
	using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    address minter;
   
	 
	 
	 mapping (uint256 => string) _uri;
	 
    constructor(address _minter) ERC721("Tile Advertisement NFT", "TAD") 	 {
		
	     minter = _minter;
	

	}
 

/**
   * @dev Function allows event owner or subscribers to mint video from event stream
   * @param _metadataURI metadata URI 
   **/
    
    function mintNFT(string calldata _metadataURI,address to ) external  returns(uint256)
   {
	  require(msg.sender == minter, "Unauthorized Minter");
      	   _tokenIdCounter.increment();

	  _safeMint(to, _tokenIdCounter.current());
	   _uri[_tokenIdCounter.current()] = _metadataURI;
       
       return _tokenIdCounter.current();
   
   }   
   
   
	
	
	function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return string(abi.encodePacked( _uri[tokenId]));

    }
 
 
function setMinter(address _minter) external onlyOwner{
    minter = _minter;
  }
}