/* eslint-disable jsx-a11y/alt-text */
import './GameCarousel.scss';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import aImg1 from 'assets/aim-trainer/aimg1.png';
import aImg2 from 'assets/aim-trainer/aimg2.png';
import aImg3 from 'assets/aim-trainer/aimg3.png';
import mgImg1 from 'assets/memory-game/img1.png';
import mgImg2 from 'assets/memory-game/img2.png';
import mgImg3 from 'assets/memory-game/img3.png';
import wImg1 from 'assets/whell-fortune/wimg1.png';
import wImg2 from 'assets/whell-fortune/wimg2.png';
import wImg3 from 'assets/whell-fortune/wimg3.png';
import wImg4 from 'assets/whell-fortune/wimg4.png';
import React, { useEffect, useState } from 'react';

const games = [
  {
    category: 'Top Played',
    name: 'Memory Game',
    description: 'Try to remember memory matrix',
    heroImage: mgImg1,
    images: [mgImg1, mgImg2, mgImg3],
    link: 'https://memory-game-xi-two.vercel.app/',
  },
  {
    category: 'Top Played',
    name: 'Aim training',
    description: 'Aim trainer, get better at your favorite FPS game 🏹',
    heroImage: aImg1,
    images: [aImg1, aImg2, aImg3],
    link: 'https://demo-aim-game-e0ae5ejdt-tunahandanis.vercel.app/',
  },
  {
    category: 'Top Played',
    name: 'Whell of Fortune',
    description: 'Fingers crossed 🤞',
    heroImage: wImg1,
    images: [wImg1, wImg2, wImg3, wImg4],
    link: 'https://wheel-of-fortune-573k7fiws-tunahandanis.vercel.app/',
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
