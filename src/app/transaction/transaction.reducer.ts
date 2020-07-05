import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './transaction.actions';
import { Transaction } from '../models/transaction.model';

export interface State {
  items: Transaction[];
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
