import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { FoodItem } from '../models/food-item.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foodItems = [
      { id: 1, name: 'Chococalte Pancakes', price: 100, madeBy: 3 },
      { id: 2, name: 'Cheeseburger', price: 160, madeBy: 2 },
      { id: 3, name: 'Garlic Bread', price: 220, madeBy: 4 },
      { id: 4, name: 'Pasta Carbonara', price: 240, madeBy: 1 },
      { id: 5, name: 'Pasta Bolognese', price: 240, madeBy: 1 },
      { id: 6, name: 'Mushroom Risotto', price: 220, madeBy: 1 },
      { id: 7, name: 'Apple Pie', price: 180, madeBy: 3 },
      { id: 8, name: 'Macarons', price: 220, madeBy: 3 },
      { id: 9, name: 'Pizza Margherita ', price: 320, madeBy: 4 },
      { id: 10, name: 'Delux Burger', price: 210, madeBy: 2 },
      { id: 11, name: 'Plain Burger', price: 130, madeBy: 2 },
      { id: 12, name: 'Chicken Burger', price: 360, madeBy: 2 },
    ];

    const informationForFoodItems = [
      { id: 1, calories: '220', weight: '150g', foodItemId: 1 },
      { id: 2, calories: '420', weight: '200g', foodItemId: 2 },
      { id: 3, calories: '220', weight: '150g', foodItemId: 3 },
      { id: 4, calories: '400', weight: '200g', foodItemId: 4 },
      { id: 5, calories: '350', weight: '220g', foodItemId: 5 },
      { id: 6, calories: '350', weight: '200g', foodItemId: 6 },
      { id: 7, calories: '420', weight: '150g', foodItemId: 7 },
      { id: 8, calories: '120', weight: '100g', foodItemId: 8 },
      { id: 9, calories: '470', weight: '300g', foodItemId: 9 },
      { id: 10, calories: '650', weight: '350g', foodItemId: 10 },
      { id: 11, calories: '350', weight: '200g', foodItemId: 11 },
      { id: 12, calories: '330', weight: '200g', foodItemId: 12 },
    ];

    const fastFoodRestaurants = [
      { id: 1, name: 'Pasta Bar' },
      { id: 2, name: 'Burger Shop' },
      { id: 3, name: 'Sweets' },
      { id: 4, name: 'Pizza Shop' },
    ];
    return { foodItems, fastFoodRestaurants, informationForFoodItems };
  }

  genId(foodItems: FoodItem[]): number {
    return foodItems.length > 0
      ? Math.max(...foodItems.map((foodItem) => foodItem.id)) + 1
      : 11;
  }
}
