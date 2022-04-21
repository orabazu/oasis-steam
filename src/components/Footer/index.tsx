import './Footer.scss';

import { PlusOutlined, SmileFilled } from '@ant-design/icons';
import { advertiserABI, advertiserAddress } from 'abi/advertiser';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import { ethers } from 'ethers';
import React from 'react';

export const Footer = () => {
  const mintAdvertiserToken = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        advertiserAddress,
        advertiserABI,
        signer,
      );

      // connectedContract.mintNFT('put ipfs link later on').then((res: any) => {
      //   console.log(res);
      // });

      let nftTxn = await connectedContract.mintNFT('put ipfs link later on', {
        value: ethers.utils.parseEther('1.0'),
      });

      await nftTxn.wait();

      console.log(nftTxn);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Footer">
      <Button icon={<PlusOutlined />} type="primary" onClick={mintAdvertiserToken}>
        Call contract
      </Button>
      <Text>2022 © Amazing Team Name</Text>
      <Button type="text" icon={<SmileFilled />}>
        Need Help?
      </Button>
    </div>
  );
};
