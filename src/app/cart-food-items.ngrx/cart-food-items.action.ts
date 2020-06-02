import { createAction, props } from '@ngrx/store';
import { FoodItem } from '../models/food-item.model';
import { Observable } from 'rxjs';
import { FoodItemInformation } from '../models/food-item-information.model';

export const addNewFoodItemToCart = createAction(
  '[CartFoodItem] AddNewFoodItemToCart',
  props<{
    foodItemToAdd: FoodItem;
    getDescipritonOfFood: (id: number) => Observable<FoodItemInformation>;
  }>()
);
export const removeFoodItemFromCart = createAction(
  '[CartFoodItem] removeFoodItemFromCart',
  props<{ foodItemToRemove: FoodItem }>()
);
