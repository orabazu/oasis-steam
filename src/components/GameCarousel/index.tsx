/* eslint-disable jsx-a11y/alt-text */
import './GameCarousel.scss';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import img1 from 'assets/sd1.jpg';
import img2 from 'assets/sd2.jpg';
import img3 from 'assets/sd3.jpg';
import img4 from 'assets/sd4.jpg';
import React, { useState } from 'react';

export const GameCarousel = () => {
  const [mainImage, setMainImage] = useState(img1);

  const games = [
    {
      category: 'Top Played',
      name: 'Stardew Valley',
      description: 'Play from your browser, earn up to 5$ a day',
      heroImage: img1,
      images: [img1, img2, img3, img4],
    },
  ];

  return (
    <Row className="GameCarousel">
      {games.map((game) => {
        <>
          <Col span={18} className="GameCarouselLeft">
            <img src={game.heroImage} className="GameImage"></img>
          </Col>
          <Col span={6} className="GameCarouselRight">
            <Text type="secondary">{game.category}</Text>
            <Title level={2} style={{ margin: `0 0 20px 0` }}>
              {game.name}
            </Title>
            <Row gutter={[16, 24]}>
              {game.images.map((img, idx) => (
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
              <Text style={{ marginTop: 10 }}>{game.description}</Text>
            </Row>
            <div className="Action">
              <Button type="primary">Play Now</Button>
            </div>
            <div className="Switch">
              <Button shape="circle" type="primary" icon={<LeftOutlined />} />
              <Text>1 of {games.length}</Text>
              <Button shape="circle" type="primary" icon={<RightOutlined />} />
            </div>
          </Col>
        </>;
      })}

      <Col span={18} className="GameCarouselLeft">
        <img src={mainImage} className="GameImage"></img>
      </Col>
      <Col span={6} className="GameCarouselRight">
        <Text type="secondary">Top Played</Text>
        <Title level={2} style={{ margin: `0 0 20px 0` }}>
          Stardew Valley
        </Title>
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <img
              src={img2}
              className="GameImage imageThumb"
              onMouseOver={() => setMainImage(img2)}
              onFocus={() => setMainImage(img2)}
            ></img>
          </Col>
          <Col span={12}>
            <img
              src={img3}
              className="GameImage imageThumb"
              onMouseOver={() => setMainImage(img3)}
              onFocus={() => setMainImage(img3)}
            ></img>
          </Col>
          <Col span={12}>
            <img
              src={img4}
              className="GameImage imageThumb"
              onMouseOver={() => setMainImage(img4)}
              onFocus={() => setMainImage(img4)}
            ></img>
          </Col>
          <Col span={12}>
            <img
              src={img1}
              className="GameImage imageThumb"
              onMouseOver={() => setMainImage(img1)}
              onFocus={() => setMainImage(img1)}
            ></img>
          </Col>
        </Row>
        <Row>
          <Text style={{ marginTop: 10 }}>
            Play from your browser, earn up to 5$ a day
          </Text>
        </Row>
        <div className="Action">
          <Button type="primary">Play Now</Button>
        </div>
        <div className="Switch">
          <Button shape="circle" type="primary" icon={<LeftOutlined />} />
          <Text>1 of 5</Text>
          <Button shape="circle" type="primary" icon={<RightOutlined />} />
        </div>
      </Col>
    </Row>
  );
};
