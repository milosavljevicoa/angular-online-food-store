import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { FoodItem } from './food-item';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foodItems = [
      { id: 11, name: 'Milk', price: 99 },
      { id: 12, name: 'Chocolate', price: 140 },
      { id: 13, name: 'Rice', price: 120 },
      { id: 14, name: 'Kiwi', price: 90 },
      { id: 15, name: 'Ice cream', price: 170 },
      { id: 16, name: 'Banana', price: 110 },
      { id: 17, name: 'Apple', price: 100 },
      { id: 18, name: 'Strawberry', price: 220 },
      { id: 19, name: 'Mango', price: 190 },
      { id: 20, name: 'Pizza', price: 360 },
    ];
    return { foodItems };
  }

  genId(foodItems: FoodItem[]): number {
    return foodItems.length > 0
      ? Math.max(...foodItems.map((foodItem) => foodItem.id)) + 1
      : 11;
  }
}
