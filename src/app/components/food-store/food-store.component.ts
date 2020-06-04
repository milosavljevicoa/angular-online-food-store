import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as CartFoodItemsActions from '../../cart-food-items.ngrx/cart-food-items.action';

import { FoodItem, FoodItemInCart } from '../../models/food-item.model';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-food-store',
  templateUrl: './food-store.component.html',
  styleUrls: ['./food-store.component.css'],
})
export class FoodStoreComponent implements OnInit {
  private numberOfItemsInCart: number = 0;

  public foodItemsToDisplay: Array<FoodItem>;

  public priceOfOrder$: Observable<number>;
  public foodItemsInCart$: Observable<Array<FoodItemInCart>>;
  public allFastFoodRestaurants$: Observable<Array<string>>;

  public foodItemNamePattern$: Subject<string> = new Subject();
  public specificFastFoodRestaurant$: Subject<string> = new Subject();

  constructor(
    private store: Store<{ price: number }>,
    private foodItemService: FoodService,
    private cartFoodItemsStore: Store<{ cartFoodItems: Array<FoodItemInCart> }>
  ) {}

  ngOnInit(): void {
    this.priceOfOrder$ = this.store.pipe(select('price'));
    this.foodItemsInCart$ = this.cartFoodItemsStore.pipe(
      select('cartFoodItems')
    );

    this.allFastFoodRestaurants$ = this.foodItemService
      .getAllFastFoodRestaurants$()
      .pipe(take(1));

    this.foodItemNamePattern$
      .pipe(
        switchMap((foodItemPattern: string) =>
          this.foodItemService.getFoodItemByPattern$(foodItemPattern)
        )
      )
      .subscribe((foodItemsToDisplay: FoodItem[]) => {
        this.foodItemsToDisplay = foodItemsToDisplay;
      });

    this.specificFastFoodRestaurant$
      .pipe(
        switchMap((fastFoodRestaurant: string) =>
          this.foodItemService.getAllFoodItemsFromRestaurnt$(fastFoodRestaurant)
        )
      )
      .subscribe((foodItemsToDisplay: Array<FoodItem>) => {
        this.foodItemsToDisplay = foodItemsToDisplay;
      });
  }

  searchedFoodItemName(foodName: string): void {
    this.foodItemNamePattern$.next(foodName);
  }

  searchedFastFoodRestaurantName(fastFoodRestaurant: string): void {
    this.specificFastFoodRestaurant$.next(fastFoodRestaurant);
  }

  addToCart(foodItem: FoodItem): void {
    const foodToAdd = { ...foodItem };
    foodToAdd.idInCart = this.numberOfItemsInCart++;

    this.cartFoodItemsStore.dispatch(
      CartFoodItemsActions.loadFoodItemInfoAddToCart({ foodItem: foodItem })
    );
  }

  removeFromCart(foodItem: FoodItemInCart): void {
    console.log(foodItem);
    this.cartFoodItemsStore.dispatch(
      CartFoodItemsActions.removeFoodCartItemFromCart({
        foodItemInCart: foodItem,
      })
    );
  }
}
