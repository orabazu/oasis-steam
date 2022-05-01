pragma solidity  ^0.8.4;
// SPDX-License-Identifier: GPL-3.0-or-later
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract TileManager is Ownable{
    address tileTokenAddress;
    address gamerNFTContract;
    address advertiserNFTContract;
    address advertisementNFTContract;
    address governorNFTContract;
    enum AdState {INVALID,VOTING,ACCEPTED,REJECTED,ACTIVE}

    IERC20 internal tileToken;
    IERC721 internal governorToken;
    IERC721 internal gamerToken;
    IERC721 internal advertiserToken;
    IERC721 internal advertisementToken;
    uint256 adPrice = 1*10**18;
    struct Vote{
        
        bool vote;
        bool isValue;
    
    }

    struct Ad {
        uint256 id;
        uint256 voteDeadline;
        address owner;
        bool active;
        bool isValue;
        uint256 yes;
        uint256 no;
        mapping (address => Vote) votes;
    }

    
    //Keep track of the amount of Tile that each player claims
    mapping (address => uint256) claims;
    mapping (uint256 => Ad) ads;

    function mintAd(string calldata _metadataURI,uint256 _deadline) public returns(uint256) {
        (bool success, bytes memory result) = advertisementNFTContract.call(abi.encodeWithSignature("mintNFT(string,address)",  _metadataURI,msg.sender));
        //require(success,"Advertisement mint not successful.");
        (uint256 id) = abi.decode(result, ( uint256));
        ads[id].owner = msg.sender;
        ads[id].active = false;
        ads[id].isValue = true;
        ads[id].voteDeadline = block.timestamp+(_deadline * 1 seconds);
        return id;
    }

    function vote(uint256 id,bool _vote) public {
      require(ads[id].isValue,"Invalid advertisement");
      require(ads[id].voteDeadline > block.timestamp,"Voting deadline has passed.");  
      require(governorToken.balanceOf(msg.sender)  >= 1,"You are not a governor.");
      require(ads[id].votes[msg.sender].isValue == false,"You have already voted.");
      
      ads[id].votes[msg.sender].isValue=true;
      ads[id].votes[msg.sender].vote = _vote;  
      
      if(_vote){
          ads[id].yes +=1;
      }else
      {
         ads[id].no +=1;
      }
    }

    function makeAdPayment(uint256 id) public payable {
      require(ads[id].isValue,"Invalid advertisement.");
      require(ads[id].owner== msg.sender,"You are not the owner of this advertisement.");
      require(ads[id].active == false,"Advertisement already paid for.");
      require(msg.value == adPrice,"Amount is not enough.");
      require(ads[id].voteDeadline < block.timestamp,"Voting deadline has not finished.");  
      require(ads[id].yes > ads[id].no,"This ad was not accepted.");
      (bool success, bytes memory result) = advertiserNFTContract.call(abi.encodeWithSignature("mintNFT(address)",  msg.sender));

      ads[id].active = true;
    }

    function getAdState(uint256 id) public view returns (AdState) {
        if(ads[id].isValue == false)
           return AdState.INVALID;
       if(ads[id].voteDeadline > block.timestamp)
          return AdState.VOTING;
      else
      {
         
          if(ads[id].active == true)
            return AdState.ACTIVE;
         
            
          if(ads[id].yes <= ads[id].no && ads[id].active ==false)
            return AdState.REJECTED;

         if(ads[id].yes > ads[id].no && ads[id].active ==false)
            return AdState.ACCEPTED;   
      }        
           return AdState.INVALID;
      
    }

    //This function is not for production.  
    //A more secure method for claiming tile will have to be developed
    function claimTile(uint256 amount) public {
      require(amount > 0 ,"Amount must be greater than zero");
      (bool success, bytes memory result) = tileTokenAddress.call(abi.encodeWithSignature("mintTile(address,uint256)",  msg.sender,amount));
      claims[msg.sender] += amount;
      if(claims[msg.sender] >= 1000*10**18 && gamerToken.balanceOf(msg.sender) == 0)  
      {
          (bool success, bytes memory result) = gamerNFTContract.call(abi.encodeWithSignature("mintNFT(address)",  msg.sender));

      }    
        
    }
    
    function mintGovernorNFT(address to) public onlyOwner {
      require(governorToken.balanceOf(to) == 0,"Already a governor.");
      (bool success, bytes memory result) = governorNFTContract.call(abi.encodeWithSignature("mintNFT(address)",  to));
          
    }

    function swapTileForRose(uint256 amount) public{
       require(amount  > 0 , "Amount must be greater than zero.");
       require(address(this).balance >= amount,"Not enough liquidity.");
       require(tileToken.balanceOf(msg.sender) >= amount,"Not enough tile tokens.");
 
       payable(address(msg.sender)).transfer(amount);
       tileToken.transferFrom(msg.sender,address(this),amount);
    }

    function buyTile() public payable{
       require(msg.value > 0 ,"Value must be greater than zero.");

    (bool success, bytes memory result) = tileTokenAddress.call(abi.encodeWithSignature("mintTile(address,uint256)",  msg.sender,msg.value));


    }

    function setTileToken(address _token) external onlyOwner{
        tileToken = IERC20(_token);
        tileTokenAddress = _token;
    }    

   function setGamerNFTContract(address _contract) external onlyOwner{
        gamerToken  = IERC721(_contract);  
        gamerNFTContract = _contract;
    } 

    function setAdvertiserNFTContract(address _contract) external onlyOwner{
        advertiserToken = IERC721(_contract);
        advertiserNFTContract =_contract;
    }    
     
   function setAdvertisementNFTContract(address _contract) external onlyOwner{
       advertisementToken  = IERC721(_contract);
       advertisementNFTContract  = _contract;
    }

  function setGovernorNFTContract(address _contract) external onlyOwner{
        governorToken = IERC721(_contract);
        governorNFTContract = _contract;
    }    

    function setAdPrice(uint256 price) public onlyOwner {
       adPrice = price;    
    }  

}

