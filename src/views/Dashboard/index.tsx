import './Dashboard.scss';

import { Col, Row } from 'antd';
import { LeftNavigation } from 'components/LeftNavigation';
import { RightBar } from 'components/RightBar';
import React, { useState } from 'react';

const Dashboard = () => {
  const [chosenCategory, setChosenCategory] = useState('All');

  const handleCategoryChoice = (newCategory: any) => {
    setChosenCategory(newCategory);
  };

  return (
    <Row className="Dashboard">
      <Col span={6}>
        <LeftNavigation
          handleCategoryChoice={handleCategoryChoice}
          chosenCategory={chosenCategory}
        ></LeftNavigation>
      </Col>
      <Col span={18}>
        <RightBar chosenCategory={chosenCategory}></RightBar>
      </Col>
    </Row>
  );
};

export default Dashboard;
