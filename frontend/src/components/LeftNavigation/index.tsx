import './LeftNavigation.scss';

import {
  AimOutlined,
  ArrowDownOutlined,
  TableOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { contractABI, contractAddress, tileTokenAddress, tileABI } from 'abi/contract';
import { Button, Card, InputNumber } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useAccountContext } from 'contexts/accountContext';
import { ethers } from 'ethers';
import React, { useMemo, useState } from 'react';
import { handleError, handleSuccess } from 'utils/common';

import axios from 'axios';

export const LeftNavigation = ({ handleCategoryChoice, chosenCategory }: any) => {
  const [accountState] = useAccountContext();
  const [tileAmount, setTileAmount] = useState<number>();
  const [direction, setDirection] = useState<'TR' | 'RT'>('TR');
  const [isLoading, setIsLoading] = useState(false);

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

  const claimTile = async () => {
    try {
      const { ethereum } = window;

      const testAmount = 0.001;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      let transaction = await connectedContract.claimTile(
        ethers.utils.parseUnits(testAmount.toString(), 'ether'),
      );

      const transactionType = 'Test';

      const transactionID = transaction.hash;

      // I'm confused about this, transaction.to seems to be the address Dominic provided,
      // and transaction.from is my wallet address, isn't it supposed to be the other way around?
      // For now, I'm switching them up, please correct any mistakes

      const from = transaction.to;
      const to = transaction.from;

      const d = new Date();
      const date = d.toLocaleDateString() + '-' + d.toLocaleTimeString();

      const amount = testAmount;

      await transaction.wait();

      insertTransaction(transactionID, amount, transactionType, from, to, date);

      handleSuccess(transaction);
    } catch (error: any) {
      handleError(error);
    }
  };

  const swapTileForRose = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      if (tileAmount) {
        let transaction = await connectedContract.swapTileForRose(
          ethers.utils.parseUnits(tileAmount.toString(), 'ether'),
        );

        const transactionType = 'Swap';

        const transactionID = transaction.hash;

        // I'm confused about this, transaction.to seems to be the address Dominic provided,
        // and transaction.from is my wallet address, isn't it supposed to be the other way around?
        // For now, I'm switching them up, please correct any mistakes
        const from = transaction.to;
        const to = transaction.from;

        const d = new Date();
        const date = d.toLocaleDateString() + '-' + d.toLocaleTimeString();

        const amount = tileAmount;

        await transaction.wait();

        insertTransaction(transactionID, amount, transactionType, from, to, date);

        handleSuccess(transaction);
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  const approve = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const tileToken = new ethers.Contract(tileTokenAddress, tileABI, signer);

      if (tileAmount) {
        let transaction = await tileToken.approve(
          contractAddress,
          ethers.utils.parseUnits(tileAmount.toString(), 'ether'),
        );

        await transaction.wait();
        handleSuccess(transaction);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const exchange = useMemo(
    () => ({
      from: direction === 'RT' ? 'ROSE' : 'TILE',
      to: direction === 'RT' ? 'TILE' : 'ROSE',
    }),
    [direction],
  );

  const changeDirection = () => {
    direction === 'TR' ? setDirection('RT') : setDirection('TR');
  };

  const swapRoseForTile = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      if (tileAmount) {
        const transaction = await connectedContract.buyTile({
          value: ethers.utils.parseEther(tileAmount.toString()),
        });

        const transactionType = 'Buy';

        const transactionID = transaction.hash;

        const from = transaction.to;
        const to = transaction.from;
        const d = new Date();
        const date = d.toLocaleDateString() + '-' + d.toLocaleTimeString();
        const amount = 1;

        await transaction.wait();

        insertTransaction(transactionID, amount, transactionType, from, to, date);

        handleSuccess(transaction);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const swap = async () => {
    setIsLoading(true);
    if (direction === 'TR') {
      await approve();
      await swapTileForRose();
      setIsLoading(false);
    } else {
      await swapRoseForTile();
      setIsLoading(false);
    }
  };

  return (
    <div className="LeftNavigation">
      <Card title="Browse Categories" bordered={false}>
        <button
          className="btn"
          onClick={() => handleCategoryChoice('All')}
          style={{ display: 'flex', background: 'transparent', border: 'none' }}
        >
          <p style={{ fontSize: '1rem', cursor: 'pointer' }}>
            <TrophyOutlined />{' '}
            <span className={chosenCategory === 'All' ? 'chosen' : ''}>All</span>
          </p>
        </button>

        <button
          className="btn"
          onClick={() => handleCategoryChoice('Action')}
          style={{ display: 'flex', background: 'transparent', border: 'none' }}
        >
          <p style={{ fontSize: '1rem', cursor: 'pointer' }}>
            <AimOutlined />{' '}
            <span className={chosenCategory === 'Action' ? 'chosen' : ''}>Action</span>
          </p>
        </button>

        <button
          className="btn"
          onClick={() => handleCategoryChoice('Puzzle')}
          style={{ display: 'flex', background: 'transparent', border: 'none' }}
        >
          <p style={{ fontSize: '1rem', cursor: 'pointer' }}>
            <TableOutlined />{' '}
            <span className={chosenCategory === 'Puzzle' ? 'chosen' : ''}>Puzzle</span>
          </p>
        </button>
      </Card>
      <Card title="Exchange ROSE token" bordered={false} className="ExchangeCard">
        <div>
          <Title level={4} style={{ textAlign: 'left' }}>
            {exchange.from}
          </Title>
          <InputNumber
            type="number"
            size="large"
            placeholder={`0.0 in ${exchange.from}`}
            step="0.1"
            onChange={(value) => setTileAmount(Number(value))}
          />
        </div>

        <br></br>

        <div className="flex flex-center">
          <Button
            className="button-fancy button-swap"
            shape="circle"
            icon={<ArrowDownOutlined />}
            size={`large`}
            onClick={changeDirection}
          />
        </div>

        <div>
          <Title level={4} style={{ textAlign: 'left' }}>
            {exchange.to}
          </Title>
          <InputNumber
            size="large"
            placeholder={`0.0 in ${exchange.to}`}
            value={tileAmount}
            disabled
          />
        </div>

        <Button
          block
          size="large"
          loading={accountState.isLoading || isLoading}
          className="button-fancy"
          onClick={swap}
        >
          {accountState.account ? 'Swap' : 'Connect Wallet'}
        </Button>
      </Card>
      <Card className="ExchangeCard" bordered={false} title="Claim TILE">
        <p style={{ paddingBottom: 10 }}>Claim 0.001 TILE tokens for testing</p>
        <Button
          block
          size="large"
          className="button-fancy"
          onClick={claimTile}
          loading={accountState.isLoading || isLoading}
        >
          {'Claim Tiles'}
        </Button>
      </Card>
    </div>
  );
};
