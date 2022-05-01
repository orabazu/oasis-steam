// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Tile is ERC20,Ownable {
    address minter;
    constructor(address _minter) ERC20("Tile", "TILE") {
        minter = _minter;
    }

    function mintTile(address to, uint256 amount) public {
        require(msg.sender == minter,"Unauthorized Minter");  
        _mint(to, amount);
        
    }

    
function setMinter(address _minter) external onlyOwner{
    minter = _minter;
  }
}