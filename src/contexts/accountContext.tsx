import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { createContext, useContext, useReducer } from 'react';
import { postData } from 'utils/http';

import {
  AccountAction,
  AccountActionTypes,
  AccountState,
  initialState,
  reducer,
} from '../reducers/accountReducer';
type AccountContextType = [AccountState, React.Dispatch<AccountAction>];

export type Props = {
  children: React.ReactNode;
};

//@ts-ignore
const AccountContext = createContext<AccountContextType>(null);
const AccountContextProvider = (props: Props): JSX.Element => {
  const [accountState, accountDispatch] = useReducer(reducer, initialState);

  return (
    <AccountContext.Provider value={[accountState, accountDispatch]}>
      {props.children}
    </AccountContext.Provider>
  );
};

async function connectWallet(
  dispatch: React.Dispatch<AccountAction>,
  importedSeed?: string,
) {
  dispatch({ type: AccountActionTypes.SET_IS_ACCOUNT_LOADING, payload: true });
  try {
    let wallet;
    if (importedSeed) {
      wallet = xrpl.Wallet.fromSeed(importedSeed);
    } else {
      const accounts = await postData(
        'https://faucet-nft.ripple.com/accounts',
        'NFT-Devnet',
      );

      console.log(accounts);
      wallet = accounts.account;
      notification.open({
        message:
          'You successfully generated a new XRP wallet, save this private seed value to recover later. ' +
          wallet.secret,
        placement: 'bottomRight',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
    }

    const { address, seed, classicAddress, secret } = wallet;
    console.log(wallet, seed, secret);

    let nftNetworkUrl = 'wss://xls20-sandbox.rippletest.net:51233';
    const client = new xrpl.Client(nftNetworkUrl);
    await client.connect();
    let response;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        response = await client.request({
          command: 'account_info',
          account: address,
          ledger_index: 'validated',
        });
        console.log(
          "\n\n----------------Get XRPL NFT Seller's Wallet Account Info----------------",
        );
        console.log(JSON.stringify(response, null, 2));

        const payload = {
          address: response.result.account_data.Account,
          balance: Number(response.result.account_data.Balance) / 1000000,
          classicAddress: classicAddress,
          secret: seed || secret,
        };

        dispatch({ type: AccountActionTypes.SET_ACCOUNT, payload });
        dispatch({ type: AccountActionTypes.SET_IS_ACCOUNT_LOADING, payload: false });

        break;
      } catch (e) {
        console.error(e);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    client.disconnect();
  } catch (error) {
    console.log(error);
    dispatch({ type: AccountActionTypes.SET_ACCOUNT_FAILURE });
  }
}

async function getAccountInfo(
  dispatch: React.Dispatch<AccountAction>,
  state: AccountState,
) {
  const wallet = xrpl.Wallet.fromSeed(state.account?.secret);
  const client = new xrpl.Client('wss://xls20-sandbox.rippletest.net:51233');
  await client.connect();

  console.log('\n\n----------------Get Account Info----------------');
  const response = await client.request({
    command: 'account_info',
    account: wallet.address,
    ledger_index: 'validated',
  });

  const payload = {
    address: response.result.account_data.Account,
    balance: Number(response.result.account_data.Balance) / 1000000,
    classicAddress: wallet.classicAddress,
    secret: wallet.seed,
  };

  dispatch({ type: AccountActionTypes.SET_ACCOUNT, payload });
  dispatch({ type: AccountActionTypes.SET_IS_ACCOUNT_LOADING, payload: false });
  client.disconnect();
}

const useAccountContext = () => useContext(AccountContext);

export { AccountContextProvider, connectWallet, getAccountInfo, useAccountContext };
