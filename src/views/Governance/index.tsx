/* eslint-disable jsx-a11y/alt-text */
import './style.scss';

import { Button, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React from 'react';

import Logo from '../../assets/logo.png';

const Governance = () => {
  return (
    <Row className="Governance">
      <div className="GovernanceCard">
        <Title level={2} style={{ margin: `0 0 20px 0` }}>
          Governance Token
        </Title>
        <Text>Governance tokens allow a user to vote on proposed ads for games.</Text>
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

export default Governance;
