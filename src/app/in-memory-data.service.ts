import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { FoodItem } from './food-item';

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
      { id: 10, name: 'Chicken Burger', price: 360, madeBy: 2 },
    ];

    const foodProducers = [
      { id: 1, name: 'Pasta Bar' },
      { id: 2, name: 'Burger Shop' },
      { id: 3, name: 'Sweets' },
      { id: 4, name: 'Pizza Shop' },
    ];
    return { foodItems, foodProducers };
  }

  genId(foodItems: FoodItem[]): number {
    return foodItems.length > 0
      ? Math.max(...foodItems.map((foodItem) => foodItem.id)) + 1
      : 11;
  }
}
