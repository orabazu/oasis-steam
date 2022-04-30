import { notification } from 'antd';
import { ethers } from 'ethers';
import React, { createContext, useContext, useReducer } from 'react';

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
const oasisEmeraldChainId = `0xa515`;

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

async function connectWallet(dispatch: React.Dispatch<AccountAction>) {
  dispatch({ type: AccountActionTypes.SET_ISLOADING, payload: true });
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Get MetaMask!');
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const balance = await provider.getBalance(accounts[0]);

    const payload = {
      address: accounts[0],
      balance: Number(ethers.utils.formatEther(balance)).toFixed(3),
    };

    dispatch({ type: AccountActionTypes.SET_ACCOUNT, payload });
    dispatch({ type: AccountActionTypes.SET_ISLOADING, payload: false });
    // setupEventListener(dispatch);
  } catch (e: any) {
    console.log(e);
    notification.error({
      message: 'Wallet connection Error',
      description: e.message,
      duration: 20,
    });
    dispatch({ type: AccountActionTypes.SET_ACCOUNT_FAILURE });
    dispatch({ type: AccountActionTypes.SET_ISLOADING, payload: false });
  }
}

// const setupEventListener = async (dispatch: React.Dispatch<AccountAction>) => {
//   try {
//     const { ethereum } = window;
//     const provider = new ethers.providers.Web3Provider(ethereum, 'any');
//     const signer = provider.getSigner();
//     const connectedContract = new ethers.Contract(
//       CONTRACT_ADDRESS,
//       myEpicNft.abi,
//       signer,
//     );
//     connectedContract.on('NewEpicNFTMinted', (from, tokenId) => {
//       const payload = `${OPENSEA_LINK}${CONTRACT_ADDRESS}/${tokenId.toNumber()}`;
//       alert(`Hey there! We've minted your NFT and sent it to your wallet.
//       It may be blank right now. It can take a max of 10 min to show up on OpenSea.`);
//       dispatch({ type: AccountActionTypes.SET_OPENSEA_LINK, payload });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const checkIfWalletIsConnected = async (dispatch: React.Dispatch<AccountAction>) => {
  const { ethereum } = window;

  if (!ethereum) {
    console.log('Make sure you have metamask!');
    dispatch({
      type: AccountActionTypes.SET_METAMASK_NOT_FOUND,
      payload: true,
    });
    return;
  } else {
    dispatch({
      type: AccountActionTypes.SET_METAMASK_NOT_FOUND,
      payload: false,
    });
    console.log('We have the ethereum object', ethereum);
    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
    provider.on('network', (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        console.log(oldNetwork);
        window.location.reload();
      }
    });

    ethereum.on('accountsChanged', async () => {
      // Do something
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (!accounts.length) {
        dispatch({ type: AccountActionTypes.SET_ACCOUNT, payload: null });
      }
      console.log('accountsChanged');
    });
  }

  const chainId = await ethereum.request({ method: 'eth_chainId' });
  console.log('Connected to chain ' + chainId);

  if (chainId !== oasisEmeraldChainId) {
    dispatch({ type: AccountActionTypes.SET_DISABLE_APP, payload: true });
    dispatch({ type: AccountActionTypes.SET_ACCOUNT, payload: null });
    return;
  } else {
    dispatch({ type: AccountActionTypes.SET_DISABLE_APP, payload: false });
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const provider = new ethers.providers.Web3Provider(ethereum);

    if (accounts.length !== 0) {
      const account = accounts[0];
      const balance = await provider.getBalance(account);

      const payload = {
        address: account,
        balance: Number(ethers.utils.formatEther(balance)).toFixed(3),
      };
      dispatch({ type: AccountActionTypes.SET_ACCOUNT, payload });
      // setupEventListener(dispatch);
    } else {
      console.log('No authorized account found');
    }
  }
};

const changeNetwork = async () => {
  try {
    const { ethereum } = window;
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: oasisEmeraldChainId }],
    });
  } catch (e: any) {
    console.error(e);
    notification.error({
      message: 'Change Network Error',
      description: e.message,
    });
  }
  // String, hex code of the chainId of the Rinkebey test network
};

const useAccountContext = () => useContext(AccountContext);

export {
  AccountContextProvider,
  changeNetwork,
  checkIfWalletIsConnected,
  connectWallet,
  useAccountContext,
};
