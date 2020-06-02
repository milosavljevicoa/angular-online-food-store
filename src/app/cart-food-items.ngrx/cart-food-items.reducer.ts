import { Action, createReducer, on } from '@ngrx/store';
import * as CartFoodActions from './cart-food-items.action';
import { FoodItem, FoodItemInCart } from '../models/food-item.model';
import { FoodItemInCartComponent } from '../components/food-item-in-cart/food-item-in-cart.component';
import { Observable } from 'rxjs';
import { FoodItemInformation } from '../models/food-item-information.model';
import { rejects } from 'assert';

export const initialCart: Array<FoodItemInCart> = new Array();

const _foodItemsInCartReducer = createReducer(
  initialCart,
  on(CartFoodActions.addNewFoodItemToCart, (currentCart, action) => {
    const indexOfFoodInCart: number = indexOfFoodItemInCart(
      action.foodItemToAdd,
      currentCart
    );
    //TODO: Async call inside ngrx... it is ngrx effects
    const newCart: Array<FoodItemInCart> = [...currentCart];
    if (indexOfFoodInCart > -1) {
      newCart[indexOfFoodInCart] = increaseCountOfSameFood(
        newCart[indexOfFoodInCart]
      );
    } else {
      createInitalCartFoodItem(
        action.foodItemToAdd,
        action.getDescipritonOfFood
      ).then((food: FoodItemInCart) => {
        console.log(food);
        newCart.push(food);
      });
    }
    return newCart;
  }),
  on(CartFoodActions.removeFoodItemFromCart, (currentCart, action) => {
    const indexOfFoodInCart: number = indexOfFoodItemInCart(
      action.foodItemToRemove,
      currentCart
    );
    const newFoodCart: Array<FoodItemInCart> = [...currentCart];
    if (indexOfFoodInCart > -1) {
      newFoodCart[indexOfFoodInCart] = decreaseCountOfSameFood(
        newFoodCart[indexOfFoodInCart]
      );
    }
    return newFoodCart.filter(
      (foodInCart: FoodItemInCart) => foodInCart.countOfSameFood !== 0
    );
  })
);

function indexOfFoodItemInCart(
  foodItem: FoodItem,
  cartOfFood: Array<FoodItemInCart>
): number {
  let indexOfFoodInCart: number = -1;
  cartOfFood.some((foodInCart: FoodItemInCart, index: number) => {
    if (isFoodItemEqualFoodItemInCart(foodItem, foodInCart)) {
      indexOfFoodInCart = index;
      return true;
    }
    return false;
  });
  return indexOfFoodInCart;
}

function isFoodItemEqualFoodItemInCart(
  foodItem: FoodItem,
  foodItemInCart: FoodItemInCart
): boolean {
  return foodItem.id === foodItemInCart.food.id;
}

function increaseCountOfSameFood(foodInCart: FoodItemInCart): FoodItemInCart {
  let updatedCountFood: FoodItemInCart = { ...foodInCart };
  updatedCountFood.countOfSameFood++;
  return updatedCountFood;
}

async function createInitalCartFoodItem(
  foodToBePutInCart: FoodItem,
  getFoodItemInformation: (
    foodItemId: number
  ) => Observable<FoodItemInformation>
): Promise<FoodItemInCart> {
  console.log(getFoodItemInformation);
  const foodInfo: FoodItemInformation = await getFoodItemInformation(
    foodToBePutInCart.id
  ).toPromise();
  console.log(foodInfo);
  const foodInCart: FoodItemInCart = {
    food: foodToBePutInCart,
    info: foodInfo,
    countOfSameFood: 1,
  };
  return new Promise((resolve) => {
    resolve(foodInCart);
  });
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
