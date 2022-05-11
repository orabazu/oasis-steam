/* const MongoClient = require('mongodb').MongoClient;
 */

/* const url =
  'mongodb+srv://dbuser:TestMongodbUser@cluster0.5uh5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
 */
/* eslint-disable jsx-a11y/alt-text */
import './Advertisement.scss';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { contractABI, contractAddress } from 'abi/contract';
import { Button, Card, Col, Input, notification, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from 'utils/common';

import gif from './../../assets/TILE_GAMES_ADVERTISER.gif';

const dummyAds = [
  {
    advertisementTitle: 'Books',
    advertisementDescription: 'Love books? Explore our collection',
    _id: 1,
    advertisementUrl: 'https://www.hachettebookgroup.com/genre/fiction/romance-fiction/',
    advertisementStatus: 'Voting in Progress',
    advertisementTokenId: '33',
  },
];

const Advertisement = () => {
  /*
  ===========
  STATE HOOKS
  ===========
  */

  const [ads, setAds] = useState<typeof dummyAds>([]);

  const [adTitle, setAdTitle] = useState('');
  const [adDesc, setAdDesc] = useState('');
  const [adUrl, setAdUrl] = useState('');

  const [dummyState, setDummyState] = useState(0);

  useEffect(() => {
    fetchAds();
    /* fetch('/getAdvertisements')
      .then((res) => res.json())
      .then((json) => setAds(json)); */
  }, [dummyState]);

  /*
  =========
  FUNCTIONS
  =========
  */

  const fetchAds = async () => {
    const res = await fetch('http://localhost:3001/getAdvertisements');
    const json = await res.json();

    setAds(json);
  };

  function insertAdvertisement(
    date: any,
    advertisementTitle: any,
    advertisementDescription: any,
    advertisementUrl: any,
    advertisementStatus: any,
    advertisementTokenId: string,
  ) {
    const newAdvertisement = {
      date,
      advertisementTitle,
      advertisementDescription,
      advertisementUrl,
      advertisementStatus,
      advertisementTokenId,
    };

    axios.post('http://localhost:3001/bidAdvertisement', newAdvertisement).finally(() => {
      setDummyState((prev) => prev + 1);
    });

    /* 
    const client = await MongoClient.connect(url, {
      // useNewUrlParser: true,
    }).catch((err: any) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db('myFirstDatabase');

      let collection = db.collection('advertisements');

      let advertisement = {
        advertisementId: advertisementId,
        date: date,
        advertisementTitle: advertisementTitle,
        advertisementDescription: advertisementDescription,
        advertisementUrl: advertisementUrl,
        advertisementStatus: advertisementStatus,
      };

      let postID = (await collection.insertOne(advertisement)).insertedId;

      console.log(postID);
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    } */
  }

  const addNewAd = () => {
    if (adTitle.trim() !== '' && adUrl.trim() !== '' && adDesc.trim() !== '') {
      // DECLARING THE ID OF THE NEW AD BID
      /* const advertisementId = ads[ads.length - 1].id + 1; */

      /* setAds((prev) => [
        ...prev,

        {
          title: adTitle,
          description: adDesc,
          url: adUrl,
          id: advertisementId,
          status: 'Voting in Progress',
        },
      ]); */

      // VARIABLES TO INSERT INTO TABLE, ALSO INCLUDES advertisementId WHICH'S ABOVE

      const d = new Date();

      const payload = {
        date: d.toLocaleDateString() + '\n' + d.toLocaleTimeString(),
        advertisementTitle: adTitle,
        advertisementDescription: adDesc,
        advertisementUrl: adUrl,
        advertisementStatus: 'Voting in Progress',
        advertisementTokenId: 'Token ID',
      };

      // LOGGING INFO ABOUT NEW AD BID MINTING TO CONSOLE

      const consoleMsg =
        '**************************' +
        '\n\nYou have minted a new advertisement bid!' +
        '\n\nAdvertisement Title: ' +
        payload.advertisementTitle +
        '\n\nAdvertisement Description: ' +
        payload.advertisementDescription +
        '\n\nAdvertisement URL: ' +
        payload.advertisementUrl +
        '\n\nAdvertisement Status: ' +
        payload.advertisementStatus +
        '\n\nDate: ' +
        payload.date +
        '\n\n**************************';

      console.log(consoleMsg);

      mintAd(payload);

      /*
      =====================================================
      INSERT THE FOLLOWING DATA TO THE ADVERTISEMENTS TABLE

      int advertisementId

      string date: Local date of the minting of ad bid

      string advertisementTitle

      string advertisementDescription

      string advertisemenUrl

      string advertisementStatus
      
      =====================================================
      */

      setAdTitle('');
      setAdDesc('');
      setAdUrl('');
    } else {
      alert('Please fill out everything');
    }
  };

  const updateAdvertisement = (id: any, newStatus: any) => {
    const update = {
      id: id,
      newStatus: newStatus,
    };

    axios.post('http://localhost:3001/updateAdvertisement', update);
    setDummyState((prev) => prev + 1);
  };

  const purchaseAd = (id: any) => {
    // FOR DATABASE CONNECTION, PLEASE CHECK OUT THE BELOW COMMENT

    const idToModify = id;

    const newAdvertisementStatus = 'Published';

    updateAdvertisement(idToModify, newAdvertisementStatus);

    // LOGGING INFO ABOUT CHANGING AD STATUS TO CONSOLE

    const consoleMsg =
      '**************************' +
      '\n\nYou have purchased your advertisement \nbid with the ID: ' +
      idToModify +
      '\n\nNew Advertisement Status: ' +
      newAdvertisementStatus +
      '\n\n**************************';

    console.log(consoleMsg);

    /*
     ===========================================================

     PLEASE FIND THE ROW WITH THE GIVEN idToModify AND REPLACE THE
     advertisementStatus OF THE ROW WITH THE NEW GIVEN NEW STATUS

     int idToModify

     string newAdvertisementStatus

     ===========================================================
     */
  };

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

  const mintAd = async (payload: any) => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      connectedContract.on('AdNFTMinted', (sender: string, tokenId: BigNumber) => {
        console.log(sender, tokenId);
        notification.success({
          message: 'Success',
          description: <p>Ad NFT #{tokenId.toNumber()} is successfuly minted</p>,
          duration: 7,
        });

        const {
          date,
          advertisementTitle,
          advertisementDescription,
          advertisementUrl,
          advertisementStatus,
        } = payload;

        insertAdvertisement(
          date,
          advertisementTitle,
          advertisementDescription,
          advertisementUrl,
          advertisementStatus,
          tokenId.toNumber().toString(),
        );
      });

      let transaction = await connectedContract.mintAd(payload.advertisementUrl, 86400);

      await transaction.wait();
      handleSuccess(transaction);

      console.log(transaction);
      // setAdTokens([...adTokens, { description: newAd, id: adTokens.length + 1 }]);
    } catch (error: any) {
      handleError(error);
    }
  };

  /*
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

   */
  const getAdState = async (id: any) => {
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
        <div className="address-info">
          <h2>My Advertiser NFT</h2>
          {ads.length > 0 ? (
            <>
              <h3 className="address">0x7AaE98b06E576c34507488C0a5F1085AFffb2869</h3>
              <img src={gif}></img>
            </>
          ) : (
            <>
              <div className="flex flex-center">
                <ExclamationCircleOutlined className="no-data-icon" />
              </div>
              <h2 className="no-ad">
                Please mint an advertisement bid to get your Advertiser NFT
              </h2>
            </>
          )}
        </div>

        <Card
          className="AdvertisementCard"
          title="Add new advertisement bid"
          bordered={false}
        >
          <h3 className="advertisement-card-label">Title</h3>
          <Input
            placeholder="Title"
            style={{ margin: `0 0 20px 0` }}
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
          ></Input>

          <h3 className="advertisement-card-label">Description</h3>
          <Input
            placeholder="Description"
            style={{ margin: `0 0 20px 0` }}
            value={adDesc}
            onChange={(e) => setAdDesc(e.target.value)}
          ></Input>

          <h3 className="advertisement-card-label">URL</h3>
          <Input
            placeholder="URL"
            style={{ margin: `0 0 20px 0` }}
            value={adUrl}
            onChange={(e) => setAdUrl(e.target.value)}
          ></Input>

          <Button block size="large" className="button-fancy" onClick={addNewAd}>
            {'Mint Ad Bid'}
          </Button>
        </Card>

        {/* <Button block size="large" className="button-fancy" onClick={mintAd}>
            {'Mint Ad'}
          </Button>  */}
      </Col>
      <Col span={12} style={{ padding: `0 0 0 20px`, marginTop: '2em' }}>
        <Title level={2} style={{ margin: `0 0 30px 0`, textAlign: 'center' }}>
          My Advertisements
        </Title>
        {ads.length > 0 ? (
          <div>
            {[...ads].reverse().map((ad) => (
              <div className="VoteCard" key={ad._id}>
                <h2 style={{ textAlign: 'center', fontSize: '1.3rem' }}>
                  #{ad.advertisementTokenId} {ad.advertisementTitle}
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
                    {ad.advertisementStatus === 'Accepted' && (
                      <button
                        className="ant-btn purchase-btn"
                        onClick={() => purchaseAd(ad._id)}
                      >
                        Purchase
                      </button>
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
          </div>
        ) : (
          <>
            <h2 className="no-ad-display">No bid</h2>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Advertisement;
