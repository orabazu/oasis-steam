/* eslint-disable jsx-a11y/alt-text */
import './Governance.scss';

import { contractABI, contractAddress } from 'abi/contract';
import { Button, notification, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { useAccountContext } from 'contexts/accountContext';
import { ethers } from 'ethers';
import React from 'react';

import Logo from '../../assets/tile3.png';

const Governance = () => {
  const [accountState] = useAccountContext();

  const mintGovernorToken = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      // connectedContract.mintNFT('put ipfs link later on').then((res: any) => {
      //   console.log(res);
      // });

      let nftTxn = await connectedContract.mintGovernorNFT(accountState.account?.address);
      // let nftTxn = await connectedContract.mintGovernorNFT('put ipfs link later on', {
      //   value: ethers.utils.parseEther('1.0'),
      // });

      await nftTxn.wait();

      console.log(nftTxn);
    } catch (error: any) {
      console.log(error.receipt.transactionHash);
      notification.error({
        message: error.reason,
        description: (
          <a
            href={`https://testnet.oasisscan.com/paratimes/transactions/${error.receipt.transactionHash}?runtime=00000000000000000000000000000000000000000000000072c8215e60d5bca7`}
            target="_blank"
            rel="noreferrer"
          >
            Check on oasis scan
          </a>
        ),
        duration: 7,
      });
    }
  };

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
          onClick={mintGovernorToken}
        >
          {'Mint Token'}
        </Button>
      </div>
    </Row>
  );
};

export default Governance;
