import './Footer.scss';

import { DollarCircleFilled, SmileFilled } from '@ant-design/icons';
import { contractABI, contractAddress } from 'abi/contract';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import { ethers } from 'ethers';
import React from 'react';
import { handleError } from 'utils/common';

export const Footer = () => {
  const mintAdvertiserToken = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      // connectedContract.mintNFT('put ipfs link later on').then((res: any) => {
      //   console.log(res);
      // });

      let nftTxn = await connectedContract.buyTile({
        value: ethers.utils.parseEther('1.0'),
      });

      await nftTxn.wait();

      console.log(nftTxn);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="Footer">
      <Button icon={<DollarCircleFilled />} type="primary" onClick={mintAdvertiserToken}>
        Buy Tile
      </Button>
      <Text>2022 © Tile Token</Text>
      <Button type="text" icon={<SmileFilled />}>
        Need Help?
      </Button>
    </div>
  );
};
