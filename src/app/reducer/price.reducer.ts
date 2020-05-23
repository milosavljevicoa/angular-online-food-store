import { Action, createReducer, on } from '@ngrx/store';
import * as PriceActions from '../actions/price.action';

export const initialPrice: number = 0;

const _priceReducer = createReducer(
  initialPrice,
  on(PriceActions.addToPrice, (state, priceToAdd) => state + priceToAdd.price),
  on(PriceActions.removeFromPrice, (state, priceToRemove) => {
    return state - priceToRemove.price;
  })
);

export function priceReducer(initialPrice: number | undefined, action: Action) {
  return _priceReducer(initialPrice, action);
}
