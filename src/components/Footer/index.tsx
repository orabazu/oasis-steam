import './Footer.scss';

import { DollarCircleFilled } from '@ant-design/icons';
import { contractABI, contractAddress } from 'abi/contract';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import { ethers } from 'ethers';
import React from 'react';
import { handleError, handleSuccess } from 'utils/common';

export const Footer = () => {
  const mintAdvertiserToken = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await connectedContract.buyTile({
        value: ethers.utils.parseEther('1.0'),
      });

      await transaction.wait();
      handleSuccess(transaction);

      console.log(transaction);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="Footer">
      <Button icon={<DollarCircleFilled />} type="primary" onClick={mintAdvertiserToken}>
        Buy Tile
      </Button>
      <div className="oasis-ad" style={{ textAlign: 'center' }}>
        <h3 style={{ fontWeight: 600 }}>
          Oasis Network. Next frontier in privacy-enabled blockchain
        </h3>
        <a
          href="https://oasisprotocol.org/"
          title="https://oasisprotocol.org/"
          target="_blank"
          style={{ margin: '.5em 0 -.7em 0' }}
          className="ant-btn button-fancy"
          rel="noreferrer"
        >
          Click to explore
        </a>
      </div>
      <Text>2022 © TILE Gaming</Text>
    </div>
  );
};
