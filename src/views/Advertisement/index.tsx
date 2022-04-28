/* eslint-disable jsx-a11y/alt-text */
import './Advertisement.scss';

import { contractABI, contractAddress } from 'abi/contract';
import { Button, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { ethers } from 'ethers';
import React from 'react';
import { handleError, handleSuccess } from 'utils/common';

import Logo from '../../assets/tile2.png';

const Advertisement = () => {
  const mintAd = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      let nftTxn = await connectedContract.mintAd(
        'put ipfs link later on',
        ethers.utils.parseEther('0.00001'),
      );

      await nftTxn.wait();
      handleSuccess(nftTxn);

      console.log(nftTxn);
    } catch (error: any) {
      handleError(error);
    }
  };

  return (
    <Row className="Advertisement">
      <div className="AdvertisementCard">
        <Title level={2} style={{ margin: `0 0 20px 0` }}>
          Advertiser Token
        </Title>
        <Text>Advertisement tokens allow you to put ads in games.</Text>
        <img src={Logo}></img>
        <Button
          block
          size="large"
          // loading={accountState.isLoading}
          className="button-fancy"
          onClick={mintAd}
        >
          {'Mint Token'}
        </Button>
      </div>
    </Row>
  );
};

export default Advertisement;
