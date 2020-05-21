import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FoodItem } from '../models/food-item';
import { FastFood } from '../models/fastFood';

import { catchError, concatAll, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodItemsService {
  private dbURL = 'api';
  private foodItemsUrl = `${this.dbURL}/foodItems`;
  private foodProducersUrl = `${this.dbURL}/foodProducers`;

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, operation);
      return of(result as T);
    };
  }

  getAllFoodItemsFrom(fastFoodRestaurants: string): Observable<FoodItem[]> {
    if (fastFoodRestaurants === 'All') return this.getAllFoodItems();

    return this.http
      .get<FastFood[]>(`${this.foodProducersUrl}/?name=${fastFoodRestaurants}`)
      .pipe(
        catchError(this.handleError<FastFood[]>('getAllFoodItemsFrom', [])),
        concatAll(),
        switchMap((producer: FastFood) =>
          this.http.get<FoodItem[]>(
            `${this.foodItemsUrl}/?madeBy=${producer.id}`
          )
        )
      );
  }

  getAllFoodItems(): Observable<FoodItem[]> {
    return this.http
      .get<FoodItem[]>(this.foodItemsUrl)
      .pipe(catchError(this.handleError<FoodItem[]>('getAllFoodItems', [])));
  }

  searchFoodItem(foodItem: string): Observable<FoodItem[]> {
    if (!foodItem.trim()) return of([]);
    return this.http
      .get<FoodItem[]>(`${this.foodItemsUrl}/?name=${foodItem}`)
      .pipe(catchError(this.handleError<FoodItem[]>('searchFoodItem', [])));
  }

  getFastFoodRestaurants(): Observable<string> {
    return this.http.get<FastFood[]>(this.foodProducersUrl).pipe(
      catchError(this.handleError<FastFood[]>('getFastFoodRestaurants', [])),
      concatAll(),
      map((DTO: any) => DTO.name)
    );
  }
}
