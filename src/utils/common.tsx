import { notification } from 'antd';
import React from 'react';

export const formatAccount = (str?: string) =>
  str && str.substr(0, 5) + '...' + str.substr(str.length - 5, str.length);

export const handleError = (error: any) => {
  console.log(error?.receipt?.transactionHash);
  notification.error({
    message: error.reason,
    description: (
      <a
        href={`https://testnet.oasisscan.com/paratimes/transactions/${error?.receipt?.transactionHash}?runtime=00000000000000000000000000000000000000000000000072c8215e60d5bca7`}
        target="_blank"
        rel="noreferrer"
      >
        Check on oasis scan
      </a>
    ),
    duration: 7,
  });
};
