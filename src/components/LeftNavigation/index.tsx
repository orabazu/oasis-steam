import './LeftNavigation.scss';

import {
  AimOutlined,
  ArrowDownOutlined,
  DingtalkOutlined,
  RiseOutlined,
  TableOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Button, Card, Input } from 'antd';
import { useAccountContext } from 'contexts/accountContext';
import React from 'react';

export const LeftNavigation = () => {
  const [accountState] = useAccountContext();
  return (
    <div className="LeftNavigation">
      <Card title="Browse Categories" bordered={false}>
        <p>
          <TrophyOutlined /> Top played
        </p>
        <p>
          <RiseOutlined /> Recently Updated
        </p>
        <p>
          <AimOutlined /> Action
        </p>
        <p>
          <DingtalkOutlined /> Hack & Slash
        </p>
        <p>
          <TableOutlined /> Puzzle
        </p>
      </Card>
      <Card title="Exchange ROSE token" bordered={false} className="ExchangeCard">
        <Input size="large" placeholder="0.0 in ROSE" />
        <br></br>
        <ArrowDownOutlined />
        <Input size="large" placeholder="0.0 in Game Token" />
        <Button
          block
          size="large"
          loading={accountState.isLoading}
          className="button-fancy"
          onClick={() => {}}
        >
          {accountState.account ? 'Swap' : 'Connect Wallet'}
        </Button>
      </Card>
    </div>
  );
};
