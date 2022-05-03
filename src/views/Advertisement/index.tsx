/* eslint-disable jsx-a11y/alt-text */
import './Advertisement.scss';

/* import { contractABI, contractAddress } from 'abi/contract';
import { Button, Col, Input, Modal, Radio, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { handleError, handleSuccess } from 'utils/common';
import React, { useState } from 'react';
*/
import { Button, Col, Input, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';

const ads = [
  {
    title: 'Books',
    description: 'Love books? Explore our collection',
    id: 1,
    url: 'https://www.hachettebookgroup.com/genre/fiction/romance-fiction/',
    status: 'Voting in Progress',
  },
  {
    title: 'Real Estate',
    description: '9000+ homes for sale in New York',
    id: 2,
    url: 'https://www.sothebysrealty.com/eng/sales/new-york-ny-usa',

    status: 'Accepted',
  },
  {
    title: 'Oasis Network',

    description: 'Oasis Network. Next frontier in privacy-enabled blockchain',
    id: 3,
    url: 'https://oasisprotocol.org/',

    status: 'Published',
  },
  {
    title: 'Rental Homes',
    description: 'You have a home anywhere in the world',
    id: 4,
    url: 'https://airbnb.com',

    status: 'Rejected',
  },
];

const Advertisement = () => {
  /* const [adTokens, setAdTokens] = useState(ads);
   const [newAd, setNewAd] = useState('');
  const [selectedAd, setSelectedAd] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVoteApproved, setIsVoteApproved] = useState(false);  */

  /* const showModal = (id: number) => {
    setIsModalVisible(true);
    setSelectedAd(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    vote(selectedAd, isVoteApproved);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onVoteChange = (e: any) => {
    setIsVoteApproved(e.target.value);
  }; */

  /* const mintAd = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      let transaction = await connectedContract.mintAd(
        'newAd',
        ethers.utils.parseEther('0.00001'),
      );

      await transaction.wait();
      handleSuccess(transaction);

      console.log(transaction);
      setAdTokens([...adTokens, { description: newAd, id: adTokens.length + 1 }]);
    } catch (error: any) {
      handleError(error);
    }
  };

  const vote = async (id: number, val: boolean) => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      let transaction = await connectedContract.vote(id, val);

      await transaction.wait();
      handleSuccess(transaction);

      console.log(transaction);
    } catch (error: any) {
      handleError(error);
    }
  };

  const getAdState = async (id: number) => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      let transaction = await connectedContract.getAdState(id);

      await transaction.wait();
      handleSuccess(transaction);

      console.log(transaction);
    } catch (error: any) {
      handleError(error);
    }
  }; */

  return (
    <Row className="Advertisement">
      <Col span={10} style={{ marginTop: '-1em' }}>
        <div className="address-info">
          <h2>My Advertiser NFT</h2>
          <h3>0x7AaE98b06E576c34507488C0a5F1085AFffb2869</h3>
        </div>
        <div className="AdvertisementCard">
          <Title level={2} style={{ margin: `0 0 20px 0` }}>
            Add new advertisement bid
          </Title>
          {/* <Input
            placeholder="Put your advertisement here"
            style={{ margin: `0 0 20px 0` }}
            value={newAd}
            onChange={(e) => setNewAd(e.target.value)}
          ></Input>
          <Button block size="large" className="button-fancy" onClick={mintAd}>
            {'Mint Ad'}
          </Button> */}
          <h3 className="advertisement-card-label">Advertisement Title</h3>
          <Input placeholder="Title" style={{ margin: `0 0 20px 0` }}></Input>

          <h3 className="advertisement-card-label">Advertisement Description</h3>
          <Input placeholder="Description" style={{ margin: `0 0 20px 0` }}></Input>

          <h3 className="advertisement-card-label">Advertisement URL</h3>
          <Input placeholder="URL" style={{ margin: `0 0 20px 0` }}></Input>

          <Button block size="large" className="button-fancy">
            {'Mint Ad Bid'}
          </Button>
        </div>
      </Col>
      <Col span={12} style={{ padding: `0 0 0 20px`, marginTop: '1em' }}>
        <Title level={2} style={{ margin: `0 0 30px 0`, textAlign: 'center' }}>
          My Advertisements
        </Title>
        {ads.map((ads) => (
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
                {ads.status === 'Accepted' && (
                  <button className="ant-btn purchase-btn">Purchase</button>
                )}
              </div>
            </div>
            {/* <div className="voteButton">
              <Button size="large" type="primary" onClick={() => showModal(ads.id)}>
                {'Vote'}
              </Button>
              <Button
                size="large"
                className="btn-fancy"
                onClick={() => getAdState(ads.id)}
              >
                {'Get Ad State'}
              </Button>
            </div> */}
          </div>
        ))}
      </Col>
      {/* <Modal
        title="Do you want to approve this ad?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <Radio.Group onChange={onVoteChange} value={isVoteApproved}>
          <Radio value={true}>A</Radio>
          <Radio value={false}>B</Radio>
        </Radio.Group>
      </Modal> */}
    </Row>
  );
};

export default Advertisement;
