import { createAction, props } from '@ngrx/store';

export const addToPrice = createAction(
  '[Price] AddToPrice',
  props<{ price: number }>()
);
export const removeFromPrice = createAction(
  '[Price] RemoveFromPrice',
  props<{ price: number }>()
);
// export const reset = createAction('[Price] Reset');
