pragma solidity  ^0.8.4;
// SPDX-License-Identifier: GPL-3.0-or-later
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Tile Advertiser Contract
 * @dev Main contract for Advertisers NFT 
 * @author Dominic Leon Hackett
 */


contract AdvertiserNFT is  ERC721URIStorage, Ownable {
    
	using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
	uint256 price = 1*10**18;
   
	 
	 
	 mapping (uint256 => string) _uri;
	 
    constructor() ERC721("Tile Advertiser NFT", "TADV") 	 {
		
	

	}
 

    function mintNFT(string calldata _metadataURI ) external payable 
   {
      require(msg.value == price, "Not Enough Sent to Contract" ); 
	  _safeMint(msg.sender, _tokenIdCounter.current());
	   _uri[_tokenIdCounter.current()] = _metadataURI;
       
	   _tokenIdCounter.increment();
   
   }   
   
   
	
	
	function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return string(abi.encodePacked( _uri[tokenId]));

    }
 
 
 function withdrawAll() external onlyOwner {
     payable(msg.sender).transfer(address(this).balance);
    }

function setPrice(uint256 _price) external onlyOwner{
  require(price > 0 ,"Price must be greater than zero");
  price = _price*10**18;  
}
}