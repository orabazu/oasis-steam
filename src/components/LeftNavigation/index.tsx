import './LeftNavigation.scss';

import {
  AimOutlined,
  ArrowDownOutlined,
  DingtalkOutlined,
  RiseOutlined,
  TableOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { contractABI, contractAddress } from 'abi/contract';
import { Button, Card, InputNumber } from 'antd';
import { useAccountContext } from 'contexts/accountContext';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { handleError } from 'utils/common';

export const LeftNavigation = () => {
  const [accountState] = useAccountContext();
  const [tileAmount, setTileAmount] = useState<number>();

  const swapTileForRose = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      if (tileAmount) {
        let nftTxn = await connectedContract.swapTileForRose(
          ethers.utils.parseUnits(tileAmount?.toString(), 'ether'),
        );

        await nftTxn.wait();
        console.log(nftTxn);
      }
    } catch (error: any) {
      handleError(error);
    }
  };

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
        <InputNumber
          type="number"
          size="large"
          placeholder="0.0 in TILE"
          // value={tileAmount}
          step="0.000000001"
          onChange={(value) => setTileAmount(Number(value))}
        />
        <br></br>
        <ArrowDownOutlined />
        <InputNumber size="large" placeholder="0.0 in ROSE" value={tileAmount} disabled />
        <Button
          block
          size="large"
          loading={accountState.isLoading}
          className="button-fancy"
          onClick={swapTileForRose}
        >
          {accountState.account ? 'Swap' : 'Connect Wallet'}
        </Button>
      </Card>
    </div>
  );
};
