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

    setRecentAd(publishedAds[publishedAds.length - 1]);
  };

  return (
    <div className="Footer">
      <Text> </Text>

      {recentAd && (
        <div className="oasis-ad" style={{ textAlign: 'center' }}>
          <h3 style={{ fontWeight: 600 }}>{recentAd.advertisementTitle}</h3>
          <a
            href={recentAd.advertisementUrl}
            title={recentAd.advertisementUrl}
            target="_blank"
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
