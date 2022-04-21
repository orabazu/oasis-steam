/* eslint-disable jsx-a11y/alt-text */
import './Advertisement.scss';

import { Button, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React from 'react';

import Logo from '../../assets/tile2.png';

const Advertisement = () => {
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
          onClick={() => {}}
        >
          {'Mint Token'}
        </Button>
      </div>
    </Row>
  );
};

export default Advertisement;
