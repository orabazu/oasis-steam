import './Footer.scss';

import { DollarCircleFilled } from '@ant-design/icons';
import { contractABI, contractAddress } from 'abi/contract';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import { handleError, handleSuccess } from 'utils/common';

import axios from 'axios';

export const Footer = () => {
  const [recentAd, setRecentAd] = useState<any>();

  useEffect(() => {
    fetchRecentAd();
  }, []);

  const fetchRecentAd = async () => {
    const res = await fetch('http://localhost:3001/getAdvertisements');
    const json = await res.json();

    const publishedAds = json.filter((ad: any) => ad.advertisementStatus === 'Published');

    console.log(publishedAds);

    setRecentAd(publishedAds[publishedAds.length - 1]);
  };

  const mintAdvertiserToken = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await connectedContract.buyTile({
        value: ethers.utils.parseEther('1.0'),
      });

      const transactionType = 'Buy';

      const transactionID = transaction.hash;

      // I'm confused about this, transaction.to seems to be the address Dominic provided,
      // and transaction.from is my wallet address, isn't it supposed to be the other way around?
      // For now, I'm switching them up, please correct any mistakes
      const from = transaction.to;
      const to = transaction.from;

      const d = new Date();
      const date = d.toLocaleDateString() + '-' + d.toLocaleTimeString();

      const amount = 1;

      await transaction.wait();

      insertTransaction(transactionID, amount, transactionType, from, to, date);

      handleSuccess(transaction);

      console.log(transaction);
    } catch (error) {
      handleError(error);
    }
  };

  async function insertTransaction(
    transactionID: any,
    amount: any,
    transactionType: any,
    from: any,
    to: any,
    date: any,
  ) {
    const newTransaction = {
      transactionId: transactionID,
      date: date,
      transactionType: transactionType,
      from: from,
      to: to,
      amount: amount,
    };

    axios.post('http://localhost:3001/makeTransaction', newTransaction);
  }

  return (
    <div className="Footer">
      <Button icon={<DollarCircleFilled />} type="primary" onClick={mintAdvertiserToken}>
        Buy Tile
      </Button>
      {recentAd && (
        <div className="oasis-ad" style={{ textAlign: 'center' }}>
          <h3 style={{ fontWeight: 600 }}>{recentAd.advertisementTitle}</h3>
          <a
            href={recentAd.advertisementUrl}
            title={recentAd.advertisementUrl}
            target="_blank"
            style={{ margin: '.5em 0 -.7em 0' }}
            className="ant-btn button-fancy"
            rel="noreferrer"
          >
            Click to explore
          </a>
        </div>
      )}
      <Text>2022 © TILE Games</Text>
    </div>
  );
};
