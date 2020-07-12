import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './transaction.actions';
import { Transaction } from '../models/transaction.model';
import { AppState } from '../app.reducer';

export interface State {
  items: Transaction[];
}

export interface AppStateWithTransaction extends AppState {
  transactions: State,
}

export const initialState: State = {
  items: [],
}

const _transactionReducer = createReducer(initialState,
  on(setItems, (state, { items }) => ({...state, items: [...items] })),
  on(unSetItems, state => ({...state, items: [] })),
);

export function transactionReducer(state, action) {
  return _transactionReducer(state, action);
}
