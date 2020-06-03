import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, concat } from 'rxjs';
import { FoodItem } from '../models/food-item.model';
import { FastFoodRestaurant } from '../models/fast-food-restaurants.model';

import {
  catchError,
  concatAll,
  map,
  switchMap,
  tap,
  filter,
} from 'rxjs/operators';
import { FoodItemInformation } from '../models/food-item-information.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private dbURL = 'api';
  private foodItemsUrl = `${this.dbURL}/foodItems`;
  private fastFoodRestaurantsUrl = `${this.dbURL}/fastFoodRestaurants`;
  private foodItemsInformationUrl = `${this.dbURL}/informationForFoodItems`;

  public static ALL_RESTAURANTS = 'All';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, operation);
      return of(result as T);
    };
  }

  getAllFoodItemsFromRestaurnt$(
    fastFoodRestaurants: string
  ): Observable<Array<FoodItem>> {
    if (fastFoodRestaurants === FoodService.ALL_RESTAURANTS)
      return this.getAllFoodItems$();

    return this.http
      .get<Array<FastFoodRestaurant>>(
        `${this.fastFoodRestaurantsUrl}/?name=${fastFoodRestaurants}`
      )
      .pipe(
        catchError(
          this.handleError<Array<FastFoodRestaurant>>(
            'getAllFoodItemsFrom',
            new Array<FoodItem>()
          )
        ),
        concatAll(),
        switchMap((producer: FastFoodRestaurant) =>
          this.http.get<Array<FoodItem>>(
            `${this.foodItemsUrl}/?madeBy=${producer.id}`
          )
        )
      );
  }

  getAllFoodItems$(): Observable<Array<FoodItem>> {
    return this.http
      .get<Array<FoodItem>>(this.foodItemsUrl)
      .pipe(
        catchError(
          this.handleError<Array<FoodItem>>(
            'getAllFoodItems',
            new Array<FoodItem>()
          )
        )
      );
  }

  getFoodItemByPattern$(pattern: string): Observable<Array<FoodItem>> {
    if (!pattern.trim()) return of(new Array<FoodItem>());
    return this.http
      .get<Array<FoodItem>>(`${this.foodItemsUrl}/?name=${pattern}`)
      .pipe(
        catchError(
          this.handleError<Array<FoodItem>>(
            'searchFoodItem',
            new Array<FoodItem>()
          )
        )
      );
  }

  getAllFastFoodRestaurants$(): Observable<Array<string>> {
    return this.http
      .get<Array<FastFoodRestaurant>>(this.fastFoodRestaurantsUrl)
      .pipe(
        map((fastFoodRestaurants: Array<FastFoodRestaurant>) => {
          const allFastFoodRestaurantsNames: Array<string> = fastFoodRestaurants.map(
            (fastFood: FastFoodRestaurant) => fastFood.name
          );
          return allFastFoodRestaurantsNames;
        }),
        catchError(
          this.handleError<Array<string>>(
            'getFastFoodRestaurants',
            new Array<string>()
          )
        )
      );
  }

  getFoodItemInformation$(foodItemId: number): Observable<FoodItemInformation> {
    return this.http
      .get<Array<FoodItemInformation>>(
        `${this.foodItemsInformationUrl}/?foodItemId=${foodItemId}`
      )
      .pipe(
        concatAll(),
        filter((info: FoodItemInformation) => info.foodItemId === foodItemId)
      );
  }
}
