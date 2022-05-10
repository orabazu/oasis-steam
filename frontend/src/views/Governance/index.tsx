/* eslint-disable jsx-a11y/alt-text */
import './Governance.scss';

import { Alert, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import gif from './../../assets/TILE_GAMES_GOVERNOR.gif';

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

  const [ads, setAds] = useState<any[]>([]);

  const [dummyState, setDummyState] = useState(0);

  useEffect(() => {
    fetchAds();
  }, [dummyState]);

  const fetchAds = async () => {
    const res = await fetch('http://localhost:3001/getAdvertisements');
    const json = await res.json();

    setAds(json);
  };

  const updateAdvertisement = (id: string, newStatus: 'Accepted' | 'Rejected') => {
    const update = {
      id,
      newStatus,
    };

    axios
      .post('http://localhost:3001/updateAdvertisement', update)
      .finally(() => setDummyState((prev) => prev + 1));
  };

  return (
    <Row className="Governance">
      {/* <Col>
        <div className="GovernanceCard">
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
        </div>
      </Col> */}

      <Col span={10} className="left-col">
        <div className="address-info">
          <h2>My Governor NFT</h2>
          <h3>0xfdfdF8eE730732d422A19f466E31cC4CE054db59</h3>
          <img src={gif}></img>
        </div>

        <h2 className="col-title align-left">Vote for Advertisements</h2>
        {ads.filter((ad) => ad.advertisementStatus === 'Voting in Progress').length ===
        0 ? (
          <>
            <div className="flex flex-center">
              <ExclamationCircleOutlined className="no-data-icon" />
            </div>
            <h2 className="no-ad">No advertisement bid minted yet</h2>
          </>
        ) : (
          ads
            .filter((ad) => ad.advertisementStatus === 'Voting in Progress')
            .map((ad) => (
              <div className="VoteCard" key={ad._id}>
                <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                  {ad.advertisementTitle}
                </h2>
                <p style={{ fontSize: '1.1rem', margin: '1.5em 0' }}>
                  {ad.advertisementDescription}
                </p>
                <div className="card-bottom">
                  <a
                    target="_blank"
                    className="ant-btn button-fancy"
                    href={ad.advertisementUrl}
                    title={ad.advertisementUrl}
                    rel="noreferrer"
                  >
                    Link
                  </a>
                  <div className="vote">
                    <button
                      className="accept-btn"
                      onClick={() => updateAdvertisement(ad._id, 'Accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => updateAdvertisement(ad._id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
        )}
      </Col>

      <Col span={12} className="right-col">
        <h2 className="col-title">Vote History</h2>
        {[...ads]
          .reverse()
          .filter((ad) => ad.advertisementStatus !== 'Voting in Progress')
          .map((ad) => (
            <div className="VoteCard" key={ad._id}>
              <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                {ad.advertisementTitle}
              </h2>
              <p style={{ fontSize: '1.1rem', margin: '1.5em 0' }}>
                {ad.advertisementDescription}
              </p>
              <div className="card-bottom">
                <a
                  target="_blank"
                  className="ant-btn button-fancy"
                  href={ad.advertisementUrl}
                  title={ad.advertisementUrl}
                  rel="noreferrer"
                >
                  Link
                </a>

                <div className="status">
                  Status:
                  <span
                    className={`status--${
                      ad.advertisementStatus === 'Accepted'
                        ? 'green'
                        : ad.advertisementStatus === 'Rejected'
                        ? 'red'
                        : ad.advertisementStatus === 'Published'
                        ? 'blue'
                        : 'dull'
                    }`}
                  >
                    {ad.advertisementStatus}
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
