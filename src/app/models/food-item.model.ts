import { FoodItemInformation } from './food-item-information.model';

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  idInCart: number;
}

export class FoodItemInCart {
  constructor(
    public food: FoodItem,
    public info: FoodItemInformation,
    public countOfSameFood: number
  ) {}
}
