import { Action, createReducer, on } from '@ngrx/store';
import * as PriceActions from './price.action';

export const initialPrice: number = 0;

const _priceReducer = createReducer(
  initialPrice,
  on(PriceActions.addToPrice, (state, action) => state + action.price),
  on(PriceActions.removeFromPrice, (state, action) => {
    return state - action.price;
  })
);

export function priceReducer(initialPrice: number = 0, action: Action) {
  return _priceReducer(initialPrice, action);
}
