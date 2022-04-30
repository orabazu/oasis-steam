/* eslint-disable jsx-a11y/alt-text */
import './Advertisement.scss';

import { contractABI, contractAddress } from 'abi/contract';
import { Button, Col, Input, Modal, Radio, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { handleError, handleSuccess } from 'utils/common';

const ads = [
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua',
    id: 1,
  },
  {
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    id: 2,
  },
  {
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    id: 3,
  },
];

const Advertisement = () => {
  const [adTokens, setAdTokens] = useState(ads);
  const [newAd, setNewAd] = useState('');
  const [selectedAd, setSelectedAd] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVoteApproved, setIsVoteApproved] = useState(false);

  const showModal = (id: number) => {
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
  };

  const mintAd = async () => {
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
  };

  return (
    <Row className="Advertisement">
      <Col span={10}>
        <div className="AdvertisementCard">
          <Title level={2} style={{ margin: `0 0 20px 0` }}>
            Add advertisement
          </Title>
          <Input
            placeholder="Put your advertisement here"
            style={{ margin: `0 0 20px 0` }}
            value={newAd}
            onChange={(e) => setNewAd(e.target.value)}
          ></Input>
          <Button block size="large" className="button-fancy" onClick={mintAd}>
            {'Mint Ad'}
          </Button>
        </div>
      </Col>
      <Col span={14} style={{ padding: `0 0 0 20px` }}>
        <Title level={2} style={{ margin: `0 0 20px 0` }}>
          Advertisements on Vote
        </Title>
        {adTokens.map((ads) => (
          <div className="VoteCard" key={ads.id}>
            <Text>{ads.description}</Text>
            <br></br>
            <div className="voteButton">
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
            </div>
          </div>
        ))}
      </Col>
      <Modal
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
      </Modal>
    </Row>
  );
};

export default Advertisement;
