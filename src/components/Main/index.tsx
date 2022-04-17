import { Button, PageHeader } from 'antd';
import Logo from 'assets/logo.png';
import { connectWallet, useAccountContext } from 'contexts/accountContext';
import React from 'react';

export type RowType = { [k: string]: any }[];
export type HeadersType =
  | {
      title: string;
      dataIndex: string;
      key: string;
    }[]
  | undefined;

const Main = () => {
  const [accountState, accountDispatch] = useAccountContext();

  return (
    <>
      <PageHeader
        ghost={false}
        avatar={{
          src: Logo,
        }}
        title="OasisStore"
        subTitle="Store"
        extra={
          <Button
            loading={accountState.isLoading}
            type="primary"
            onClick={() =>
              accountState.account?.address ? undefined : connectWallet(accountDispatch)
            }
          >
            {'Connect Wallet'}
          </Button>
        }
      ></PageHeader>
      <div className="body">body</div>
    </>
  );
};

export default Main;
