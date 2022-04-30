/* eslint-disable jsx-a11y/alt-text */
import './Governance.scss';

import { contractABI, contractAddress } from 'abi/contract';
import { Button, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
// import { useAccountContext } from 'contexts/accountContext';
import { ethers } from 'ethers';
import React from 'react';
import { handleError, handleSuccess } from 'utils/common';

import Logo from '../../assets/tile3.png';

const Governance = () => {
  // const [accountState] = useAccountContext();

  // const mintGovernorToken = async () => {
  //   try {
  //     const { ethereum } = window;

  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     const signer = provider.getSigner();
  //     const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

  //     let transaction = await connectedContract.mintGovernorNFT(
  //       accountState.account?.address,
  //     );

  //     await transaction.wait();
  //     handleSuccess(transaction);

  //     console.log(transaction);
  //   } catch (error: any) {
  //     handleError(error);
  //   }
  // };

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

  return (
    <Row className="Governance">
      <Col>
        <div className="GovernanceCard">
          <Title level={2} style={{ margin: `0 0 20px 0` }}>
            Governance
          </Title>
          <Text>Governance tokens allow a user to vote on proposed ads for games.</Text>
          <img src={Logo}></img>
          {/* <Button
            block
            size="large"
            // loading={accountState.isLoading}
            className="button-fancy"
            onClick={mintGovernorToken}
          >
            {'Mint Token'}
          </Button> */}
        </div>

        <div className="TileCard">
          <Title level={2} style={{ margin: `0 0 20px 0` }}>
            Claim TILE
          </Title>
          <Text style={{ paddingBottom: 10 }}>Claim 1 tile tokens for testing</Text>
          <Button block size="large" className="button-fancy" onClick={claimTile}>
            {'Claim Tiles'}
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Governance;
