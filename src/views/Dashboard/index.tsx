import './style.scss';

import { Col, Row } from 'antd';
import { LeftNavigation } from 'components/LeftNavigation';
import { RightBar } from 'components/RightBar';
import React from 'react';

const Dashboard = () => {
  return (
    <Row className="Dashboard">
      <Col span={6}>
        <LeftNavigation></LeftNavigation>
      </Col>
      <Col span={18}>
        <RightBar></RightBar>
      </Col>
    </Row>
  );
};

export default Dashboard;
