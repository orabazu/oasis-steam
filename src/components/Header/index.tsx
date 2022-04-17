import './Header.scss';

import { Button, PageHeader } from 'antd';
import Logo from 'assets/logo.png';
import { useAccountContext } from 'contexts/accountContext';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// import xrpLogo from '../../assets/xrp.png';

export type RowType = { [k: string]: any }[];
export type HeadersType =
  | {
      title: string;
      dataIndex: string;
      key: string;
    }[]
  | undefined;

const Header = () => {
  const [accountState] = useAccountContext();

  return (
    <>
      <div className="Header">
        <PageHeader
          className="PageHeader"
          ghost={false}
          avatar={{
            src: Logo,
          }}
          title={
            <Link to="/" className="heading">
              Oasis Store
            </Link>
          }
          extra={
            <>
              {accountState.account?.balance && (
                <Button>{accountState.account?.balance} XRP</Button>
              )}

              <Button loading={accountState.isLoading} type="primary">
                {'Connect Wallet'}
              </Button>
            </>
          }
        ></PageHeader>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
