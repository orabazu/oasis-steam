import './Header.scss';

import { Button, PageHeader } from 'antd';
import Logo from 'assets/logo.png';
import {
  changeNetwork,
  checkIfWalletIsConnected,
  connectWallet,
  useAccountContext,
} from 'contexts/accountContext';
import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { formatAccount } from 'utils/common';

export type RowType = { [k: string]: any }[];
export type HeadersType =
  | {
      title: string;
      dataIndex: string;
      key: string;
    }[]
  | undefined;

const Header = () => {
  const [accountState, accountDispatch] = useAccountContext();
  let buttonText;

  if (accountState.metamaskNotFound) {
    buttonText = 'Please install metamask';
  } else if (accountState.isAppDisabled) {
    buttonText = 'Switch Network';
  } else {
    buttonText = 'Connect Wallet';
  }

  useEffect(() => {
    checkIfWalletIsConnected(accountDispatch);
  }, []);

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
            <NavLink to="/" className="heading">
              Project Name Here
            </NavLink>
          }
          extra={
            <>
              <NavLink
                to="/"
                className="menuItem"
                style={({ isActive }) =>
                  isActive ? { color: 'red' } : { color: 'blue' }
                }
              >
                Store
              </NavLink>
              <NavLink to="/governance" className="menuItem">
                Governance
              </NavLink>
              <NavLink to="/ads" className="menuItem">
                Ads
              </NavLink>
              <Button
                loading={accountState.isLoading}
                type="primary"
                onClick={() =>
                  accountState.isAppDisabled
                    ? changeNetwork()
                    : connectWallet(accountDispatch)
                }
                disabled={!!accountState?.account || accountState.metamaskNotFound}
              >
                {accountState.account
                  ? `${formatAccount(accountState?.account.address)} | ${
                      accountState?.account.balance
                    }`
                  : buttonText}
                {/* <img className={"its-eth-babe"} src={ethLogo} alt="button" /> */}
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
