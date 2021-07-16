import { AccountActionType } from "../action-types/accountActionTypes";

interface DepositAction {
  type: AccountActionType.DEPOSIT;
  payload: number;
}

interface WithdrawAction {
  type: AccountActionType.WITHDRAW;
  payload: number;
}

interface BankruptAction {
  type: AccountActionType.BANKRUPT;
}

export type AccountAction = DepositAction | WithdrawAction | BankruptAction;
