import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as transaction from './transaction/transaction.reducer';

export interface AppState {
  ui: ui.State,
  user: auth.State,
  transactions: transaction.State,
};

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  transactions: transaction.transactionReducer,
}
