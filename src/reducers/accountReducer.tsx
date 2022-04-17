/* eslint-disable no-unused-vars */
export type AccountState = {
  isLoading: boolean;
  account: {
    address: string;
    balance: number;
    classicAddress: string;
    secret: string;
  } | null;
  isNextButtonDisabled: boolean;
  nextButtonTooltipText: string;
  lastMintedNft?: string;
};

const initialState: AccountState = {
  account: null,
  isLoading: false,
  isNextButtonDisabled: false,
  nextButtonTooltipText: 'Please connect wallet first',
};

export enum AccountActionTypes {
  SET_ACCOUNT = 'SET_ACCOUNT',
  SET_IS_ACCOUNT_LOADING = 'SET_IS_ACCOUNT_LOADING',
  SET_ACCOUNT_FAILURE = 'SET_ACCOUNT_FAILURE',
  SET_IS_NEXT_BUTTON_DISABLED = 'SET_IS_NEXT_BUTTON_DISABLED',
  SET_NEXT_BUTTON_TOOLTIP_TEXT = 'SET_NEXT_BUTTON_TOOLTIP_TEXT',
  SET_LAST_MINTED_NFT = 'SET_LAST_MINTED_NFT',
}

export type AccountAction =
  | {
      type: AccountActionTypes.SET_ACCOUNT;
      payload: {
        address: string;
        balance: number;
        classicAddress: string;
        secret: string;
      } | null;
    }
  | { type: AccountActionTypes.SET_IS_ACCOUNT_LOADING; payload: boolean }
  | { type: AccountActionTypes.SET_ACCOUNT_FAILURE }
  | { type: AccountActionTypes.SET_IS_NEXT_BUTTON_DISABLED; payload: boolean }
  | { type: AccountActionTypes.SET_NEXT_BUTTON_TOOLTIP_TEXT; payload: string }
  | { type: AccountActionTypes.SET_LAST_MINTED_NFT; payload: string };

const reducer = (state: AccountState, action: AccountAction): AccountState => {
  switch (action.type) {
    case AccountActionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case AccountActionTypes.SET_ACCOUNT_FAILURE:
      return {
        ...state,
        account: null,
      };
    case AccountActionTypes.SET_IS_ACCOUNT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AccountActionTypes.SET_IS_NEXT_BUTTON_DISABLED:
      return {
        ...state,
        isNextButtonDisabled: action.payload,
      };
    case AccountActionTypes.SET_LAST_MINTED_NFT:
      return {
        ...state,
        lastMintedNft: action.payload,
      };
    case AccountActionTypes.SET_NEXT_BUTTON_TOOLTIP_TEXT:
      return {
        ...state,
        nextButtonTooltipText: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
