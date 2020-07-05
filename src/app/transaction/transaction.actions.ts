import { createAction, props } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';

export const setItems = createAction(
  '[Transaction] Set items',
  props<{items: Transaction[]}>()
);

export const unSetItems = createAction('[Transaction] Unset items');
