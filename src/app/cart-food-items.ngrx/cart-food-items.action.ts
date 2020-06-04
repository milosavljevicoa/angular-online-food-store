import { createAction, props } from '@ngrx/store';
import { FoodItem, FoodItemInCart } from 'src/app/models/food-item.model';

export const removeFoodItemFromCart = createAction(
  '[Removing from component] removeFoodItemFromCart',
  props<{ idOfFoodItemToRemove: number }>()
);

export const loadFoodItemInfoAddToCart = createAction(
  '[Load Food Info From Api] load info from api and create food cart item ',
  props<{ foodItem: FoodItem }>()
);

export const addFoodCartItemToCart = createAction(
  '[Add from effect] add food cart item to cart',
  props<{ foodCartItem: FoodItemInCart }>()
);

export const removeFoodCartItemFromCart = createAction(
  '[Remove Food Cart Item and Reduce Total Price] removing food item by id',
  props<{ foodItemInCart: FoodItemInCart }>()
);
