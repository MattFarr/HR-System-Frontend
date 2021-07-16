import { AccountActionType } from "../action-types/accountActionTypes";
import { Dispatch } from "redux";
import { AccountAction } from "../actions/accountActions";

export const depositMoney = (amount: number) => {
  return (dispatch: Dispatch<AccountAction>) => {
    dispatch({
      type: AccountActionType.DEPOSIT,
      payload: amount,
    });
  };
};

export const withdrawMoney = (amount: number) => {
  return (dispatch: Dispatch<AccountAction>) => {
    dispatch({
      type: AccountActionType.WITHDRAW,
      payload: amount,
    });
  };
};

export const bankrupt = () => {
  return (dispatch: Dispatch<AccountAction>) => {
    dispatch({
      type: AccountActionType.BANKRUPT,
    });
  };
};
