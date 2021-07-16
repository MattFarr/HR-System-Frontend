import { AccountActionType } from "../action-types/accountActionTypes";
import { AccountAction } from "../actions/accountActions";

const initialState = 0;

const accountReducer = (
  state: number = initialState,
  action: AccountAction
) => {
  switch (action.type) {
    case AccountActionType.DEPOSIT:
      return state + action.payload;
    case AccountActionType.WITHDRAW:
      return state - action.payload;
    case AccountActionType.BANKRUPT:
      return 0;
    default:
      return state;
  }
};

export default accountReducer;
