import { Action, createReducer, on } from '@ngrx/store';
import * as CartFoodActions from './cart-food-items.action';
import { FoodItemInCart } from '../models/food-item.model';

export const initialCart: Array<FoodItemInCart> = new Array();

const _foodItemsInCartReducer = createReducer(
  initialCart,
  on(CartFoodActions.addFoodCartItemToCart, (currentState, action) => {
    let isFoodAddedToCart: boolean = false;
    const newState = currentState.map((food: FoodItemInCart) => {
      if (action.foodCartItem.food.id === food.food.id) {
        const moreOfSameFood: FoodItemInCart = increaseCountOfSameFood(food);
        isFoodAddedToCart = true;
        return moreOfSameFood;
      }
      return food;
    });
    if (!isFoodAddedToCart) newState.push(action.foodCartItem);
    return newState;
  }),
  on(CartFoodActions.removeFoodItemFromCart, (currentCart, action) => {
    const foodCartWithDecreasedFoodCount = currentCart.map(
      (foodInCart: FoodItemInCart) => {
        if (action.idOfFoodItemToRemove === foodInCart.food.id) {
          const updatedFoodItem: FoodItemInCart = decreaseCountOfSameFood(
            foodInCart
          );
          console.log(updatedFoodItem);
          return updatedFoodItem;
        }
        return foodInCart;
      }
    );
    return foodCartWithDecreasedFoodCount.filter(
      (foodItemInCart: FoodItemInCart) => foodItemInCart.countOfSameFood > 0
    );
  })
);

function increaseCountOfSameFood(foodInCart: FoodItemInCart): FoodItemInCart {
  let updatedCountFood: FoodItemInCart = { ...foodInCart };
  updatedCountFood.countOfSameFood++;
  return updatedCountFood;
}

function decreaseCountOfSameFood(foodInCart: FoodItemInCart): FoodItemInCart {
  let updatedCountFood: FoodItemInCart = { ...foodInCart };
  updatedCountFood.countOfSameFood--;
  return updatedCountFood;
}

export function cartFoodItemsReducer(
  initialFoodItemsInCart: Array<FoodItemInCart> = new Array(),
  action: Action
) {
  return _foodItemsInCartReducer(initialFoodItemsInCart, action);
}
