/* // export const advertiserAddress = '0x7790b8300123a497f3E48d871DdF483dCB8d5722';
export const contractAddress = '0xC6026Ee9D0aDaEeD86F4C2B04c40Cb3a5dC27a77';
export const contractABI = [
  'function mintNFT(string calldata _metadataURI ) external payable',

  'function mintAd(string calldata _metadataURI,uint256 _deadline) public', //This function allows any user to mint and ad. it expects that the front end will upload meta data to IPFS or some other platform and then provide the url
  'function vote(uint256 id,bool _vote) public', //id is the token id of the ad to vote for. set _vote to true for yes and false for no
  'function makeAdPayment(uint256 id) public payable', //User must pay for ad to activate it after vote. current price for Ad is 1 rose.
  'function getAdState(uint256 id) public view returns (AdState)', // 0 Not a valid ad,  2 Voting in progress, 3 Accepted, 4 Rejected, 5 Active
  'function claimTile(uint256 amount) public', //Claim tile points  amount in WEI
  'function mintGovernorNFT(address to) public', //Mint Governor NFT.  to is the address to send token
  'function swapTileForRose(uint256 amount) public', //amount in WEI.  must approve spending of tile before calling this 'function. contract must have enough rose to swap for tile else this will fail
  'function buyTile() public payable', //Purchase tile tokens
  'function approve(address _spender, uint256 _value) public returns (bool success)', // fake approve
];
 */

// export const advertiserAddress = '0x7790b8300123a497f3E48d871DdF483dCB8d5722';
export const contractAddress = '0x220B6Ca20db9Af34c2f1A0e47B747C7659523d91';
export const contractABI = [
  'function mintNFT(string calldata _metadataURI ) external payable',

  'function mintAd(string calldata _metadataURI,uint256 _deadline) public returns(uint256)', // This function allows any user to mint and ad.  it expects that the front end will upload meta data to IPFS or some other platform and then provide the url
  'function vote(uint256 id,bool _vote) public', //id is the token id of the ad to vote for. set _vote to true for yes and false for no
  'function makeAdPayment(uint256 id) public payable', //User must pay for ad to activate it after vote. current price for Ad is 1 rose.
  'function getAdState(uint256 id) public view returns (AdState)', // 0 Not a valid ad,  2 Voting in progress, 3 Accepted, 4 Rejected, 5 Active
  'function claimTile(uint256 amount) public', //Claim tile points  amount in WEI
  'function mintGovernorNFT(address to) public', //Mint Governor NFT.  to is the address to send token
  'function swapTileForRose(uint256 amount) public', //amount in WEI.  must approve spending of tile before calling this 'function. contract must have enough rose to swap for tile else this will fail
  'function buyTile() public payable', //Purchase tile tokens
  'function approve(address _spender, uint256 _value) public returns (bool success)', // fake approve
];
