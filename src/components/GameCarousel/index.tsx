/* eslint-disable jsx-a11y/alt-text */
import './GameCarousel.scss';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';

import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';

import aImg1 from 'assets/aim-trainer/aimg1.png';
import aImg2 from 'assets/aim-trainer/aimg2.png';
import aImg3 from 'assets/aim-trainer/aimg3.png';
import aImg4 from 'assets/aim-trainer/aimg4.png';

import cc1 from 'assets/crypto-cards/cc1.png';
import cc2 from 'assets/crypto-cards/cc2.png';
import cc3 from 'assets/crypto-cards/cc3.png';
import cc4 from 'assets/crypto-cards/cc4.png';

import React, { useEffect, useState } from 'react';

const games = [
  {
    category: 'Top Played',
    name: 'Crypto Cards',
    description: 'Try to remember memory matrix',
    heroImage: cc1,
    images: [cc1, cc2, cc3, cc4],
    link: 'https://memory-game-xi-two.vercel.app/',
  },
  {
    category: 'Top Played',
    name: 'Aim Trainer',
    description: 'Aim trainer, get better at your favorite FPS game 🏹',
    heroImage: aImg1,
    images: [aImg1, aImg2, aImg3, aImg4],
    link: 'https://demo-aim-game.vercel.app/',
  },
];

export const GameCarousel = () => {
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const [mainImage, setMainImage] = useState(games[0].heroImage);

  useEffect(() => {
    setMainImage(games[selectedGameIndex].heroImage);
  }, [selectedGameIndex]);

  const increaseGame = () => {
    const newIndex = selectedGameIndex + 1 < games.length ? selectedGameIndex + 1 : 0;
    setSelectedGameIndex(newIndex);
  };

  const decreaseGame = () => {
    const newIndex = selectedGameIndex - 1 > 0 ? selectedGameIndex - 1 : games.length - 1;
    setSelectedGameIndex(newIndex);
  };

  return (
    <Row className="GameCarousel">
      <>
        <Col span={18} className="GameCarouselLeft">
          <img src={mainImage} className="GameImage"></img>
        </Col>
        <Col span={6} className="GameCarouselRight">
          <Text type="secondary">{games[selectedGameIndex].category}</Text>
          <Title level={2} style={{ margin: `0 0 20px 0` }}>
            {games[selectedGameIndex].name}
          </Title>
          <Row gutter={[16, 24]}>
            {games[selectedGameIndex].images.map((img, idx) => (
              <Col span={12} key={idx}>
                <img
                  src={img}
                  className="GameImage imageThumb"
                  onMouseOver={() => setMainImage(img)}
                  onFocus={() => setMainImage(img)}
                ></img>
              </Col>
            ))}
          </Row>
          <Row>
            <Text style={{ marginTop: 10 }}>{games[selectedGameIndex].description}</Text>
          </Row>
          <div className="Action">
            <a href={games[selectedGameIndex].link} target="_blank" rel="noreferrer">
              <Button type="primary">Play now</Button>
            </a>
          </div>
          <div className="Switch">
            <Button
              shape="circle"
              type="primary"
              icon={<LeftOutlined />}
              onClick={decreaseGame}
            />
            <Text>
              {selectedGameIndex + 1} of {games.length}
            </Text>
            <Button
              shape="circle"
              type="primary"
              icon={<RightOutlined />}
              onClick={increaseGame}
            />
          </div>
        </Col>
      </>
    </Row>
  );
};
