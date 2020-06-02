import { FoodItemInformation } from './food-item-information.model';

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  idInCart: number;
}

export interface FoodItemInCart {
  food: FoodItem;
  info: FoodItemInformation;
  countOfSameFood: number;
}
