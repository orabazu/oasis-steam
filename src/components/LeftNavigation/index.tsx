import './LeftNavigation.scss';

import {
  AimOutlined,
  ArrowDownOutlined,
  TableOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { contractABI, contractAddress } from 'abi/contract';
import { Button, Card, InputNumber } from 'antd';
import { useAccountContext } from 'contexts/accountContext';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { handleError, handleSuccess } from 'utils/common';

export const LeftNavigation = ({ handleCategoryChoice, chosenCategory }: any) => {
  const [accountState] = useAccountContext();
  const [tileAmount, setTileAmount] = useState<number>();

  const claimTile = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      let transaction = await connectedContract.claimTile(
        ethers.utils.parseUnits('1.0', 'ether'),
      );

      await transaction.wait();
      handleSuccess(transaction);

      console.log(transaction);
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
      // console.log(connectedContract);
      // await connectedContract.approve(
      //   contractAddress,
      //   ethers.utils.parseUnits('0.0001', 'ether'),
      // );

      if (tileAmount) {
        let transaction = await connectedContract.swapTileForRose(
          ethers.utils.parseUnits((tileAmount / 1000).toString(), 'ether'),
        );

        await transaction.wait();
        handleSuccess(transaction);
        console.log(transaction);
      }
    } catch (error: any) {
      handleError(error);
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
      <Card className="TileCard">
        <h2 style={{ margin: `0 0 20px 0` }}>Claim TILE</h2>
        <p style={{ paddingBottom: 10 }}>Claim 1 tile tokens for testing</p>
        <Button block size="large" className="button-fancy" onClick={claimTile}>
          {'Claim Tiles'}
        </Button>
      </Card>
    </div>
  );
};
