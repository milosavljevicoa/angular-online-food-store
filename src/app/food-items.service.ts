import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FoodItem } from './food-item';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodItemsService {
  private foodItemsUrl = 'api/foodItems';
  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<FoodItem[]> {
    return this.http
      .get<FoodItem[]>(this.foodItemsUrl)
      .pipe(catchError(this.handleError<FoodItem[]>('getFoodItems', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, operation);
      return of(result as T);
    };
  }

  get showAllFoodItemsString(): string {
    return '--all';
  }

  searchFoodItem(foodItem: string): Observable<FoodItem[]> {
    if (!foodItem.trim()) {
      return of([]);
    }
    if (foodItem == this.showAllFoodItemsString) {
      return this.getFoodItems();
    }
    return this.http
      .get<FoodItem[]>(`${this.foodItemsUrl}/?name=${foodItem}`)
      .pipe(catchError(this.handleError<FoodItem[]>('searchFood', [])));
  }
}
