import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FoodService } from '../services/food.service';
import * as CartFoodActions from './cart-food-items.action';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { FoodItemInformation } from '../models/food-item-information.model';
import { EMPTY, of, Observable } from 'rxjs';
import { FoodItem, FoodItemInCart } from '../models/food-item.model';
import * as PriceActions from '../price.ngrx/price.action';

@Injectable()
export class CartFoodItemsEffects {
  addFoodWithInfoToCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartFoodActions.loadFoodItemInfoAddToCart),
      map((action) => action.foodItem),
      mergeMap((food: FoodItem) =>
        this.foodService
          .getFoodItemInformation$(food.id)
          .pipe(
            map(
              (foodInfo: FoodItemInformation) =>
                new FoodItemInCart(food, foodInfo, 1)
            )
          )
      ),
      mergeMap((foodInCart: FoodItemInCart) =>
        of(
          PriceActions.addToPrice({ price: foodInCart.food.price }),
          CartFoodActions.addFoodCartItemToCart({ foodCartItem: foodInCart })
        )
      ),
      catchError(() => EMPTY)
    )
  );

  removeFoodFromCart: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartFoodActions.removeFoodCartItemFromCart),
      map((action) => action.foodItemInCart),
      mergeMap((foodInCart: FoodItemInCart) =>
        of(
          PriceActions.removeFromPrice({ price: foodInCart.food.price }),
          CartFoodActions.removeFoodItemFromCart({
            idOfFoodItemToRemove: foodInCart.food.id,
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private foodService: FoodService) {}
}
