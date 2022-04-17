import './Footer.scss';

import { PlusOutlined, SmileFilled } from '@ant-design/icons';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

export const Footer = () => {
  return (
    <div className="Footer">
      <Button icon={<PlusOutlined />} type="primary">
        Add a Game
      </Button>
      <Text>2022 © Amazing Team Name</Text>
      <Button type="text" icon={<SmileFilled />}>
        Need Help?
      </Button>
    </div>
  );
};
