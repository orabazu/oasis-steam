import { notification } from 'antd';
import React from 'react';

export const formatAccount = (str?: string) =>
  str && str.substr(0, 5) + '...' + str.substr(str.length - 5, str.length);

export const handleError = (error: any) => {
  console.error(error);
  console.log(`Hash: ${error?.receipt?.transactionHash}`);
  notification.error({
    message: error.reason,
    description: (
      <a
        href={`https://testnet.oasisscan.com/paratimes/transactions/${error?.receipt?.transactionHash}?runtime=00000000000000000000000000000000000000000000000072c8215e60d5bca7`}
        target="_blank"
        rel="noreferrer"
      >
        Check on Oasis Scan
      </a>
    ),
    duration: 7,
  });
};

export const handleSuccess = (success: any) => {
  console.log(success);
  notification.success({
    message: 'Success',
    description: (
      <a
        href={`https://testnet.oasisscan.com/paratimes/transactions/${success.hash}?runtime=00000000000000000000000000000000000000000000000072c8215e60d5bca7`}
        target="_blank"
        rel="noreferrer"
      >
        Check on Oasis Scan
      </a>
    ),
    duration: 7,
  });
};
