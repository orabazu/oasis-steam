/* eslint-disable jsx-a11y/alt-text */
import './Governance.scss';

import { Col, Row } from 'antd';
/* import { contractABI, contractAddress } from 'abi/contract';
import { Button, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
// import { useAccountContext } from 'contexts/accountContext';
import { ethers } from 'ethers';
import React from 'react';
import { handleError, handleSuccess } from 'utils/common';

import Logo from '../../assets/tile3.png'; */
import React from 'react';

const ads = [
  {
    title: 'Books',
    description: 'Love books? Explore our collection',
    id: 1,
    url: 'https://www.hachettebookgroup.com/genre/fiction/romance-fiction/',
    status: 'Voting in Progress',
    vote: '',
  },
  {
    title: 'Real Estate',
    description: '9000+ homes for sale in New York',
    id: 2,
    url: 'https://www.sothebysrealty.com/eng/sales/new-york-ny-usa',

    status: 'Accepted',
    vote: 'Reject',
  },
  {
    title: 'Oasis Network',

    description: 'Oasis Network. Next frontier in privacy-enabled blockchain',
    id: 3,
    url: 'https://oasisprotocol.org/',

    status: 'Published',
    vote: 'Reject',
  },
  {
    title: 'Rental Homes',
    description: 'You have a home anywhere in the world',
    id: 4,
    url: 'https://airbnb.com',

    status: 'Rejected',
    vote: 'Accept',
  },
  {
    title: 'Crypto Payments',
    description: 'Tap crypto’s potential with a pioneer in global payments',
    id: 5,
    url: 'https://usa.visa.com/solutions/crypto.html',
    status: 'Voting in Progress',
  },
];

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

  /* const claimTile = async () => {
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
  }; */

  return (
    <Row className="Governance">
      <Col>
        {/* <div className="GovernanceCard">
          <Title level={2} style={{ margin: `0 0 20px 0` }}>
            Governance
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
        </div> */}

        {/* <div className="TileCard">
          <Title level={2} style={{ margin: `0 0 20px 0` }}>
            Claim TILE
          </Title>
          <Text style={{ paddingBottom: 10 }}>Claim 1 tile tokens for testing</Text>
          <Button block size="large" className="button-fancy" onClick={claimTile}>
            {'Claim Tiles'}
          </Button>
        </div> */}
      </Col>

      <Col span={9} className="left-col">
        <div className="address-info">
          <h2>My Governor NFT</h2>
          <h3>0xfdfdF8eE730732d422A19f466E31cC4CE054db59</h3>
        </div>

        <h2 className="col-title">Vote for Advertisements</h2>
        {ads
          .filter((ad) => ad.status === 'Voting in Progress')
          .map((ads) => (
            <div className="VoteCard" key={ads.id}>
              <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>{ads.title}</h2>
              <p style={{ fontSize: '1.1rem', margin: '1.5em 0' }}>{ads.description}</p>
              <div className="card-bottom">
                <a
                  target="_blank"
                  className="ant-btn button-fancy"
                  href={ads.url}
                  title={ads.url}
                  rel="noreferrer"
                >
                  Link
                </a>
                <div className="vote">
                  <button className="accept-btn">Accept</button>
                  <button className="reject-btn">Reject</button>
                </div>
              </div>
            </div>
          ))}
      </Col>

      <Col span={9} className="right-col">
        <h2 className="col-title">Vote History</h2>
        {ads
          .filter((ad) => ad.status !== 'Voting in Progress')
          .map((ads) => (
            <div className="VoteCard" key={ads.id}>
              <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>{ads.title}</h2>
              <p style={{ fontSize: '1.1rem', margin: '1.5em 0' }}>{ads.description}</p>
              <div className="card-bottom">
                <a
                  target="_blank"
                  className="ant-btn button-fancy"
                  href={ads.url}
                  title={ads.url}
                  rel="noreferrer"
                >
                  Link
                </a>
                <div className="status voted">
                  Voted:{' '}
                  <span
                    className={`status--${
                      ads.vote === 'Accept'
                        ? 'green'
                        : ads.vote === 'Reject'
                        ? 'red'
                        : 'dull'
                    }`}
                  >
                    {ads.vote}
                  </span>
                </div>
                <div className="status">
                  Status:
                  <span
                    className={`status--${
                      ads.status === 'Accepted'
                        ? 'green'
                        : ads.status === 'Rejected'
                        ? 'red'
                        : ads.status === 'Published'
                        ? 'blue'
                        : 'dull'
                    }`}
                  >
                    {ads.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </Col>
    </Row>
  );
};

export default Governance;
