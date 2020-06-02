import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as PriceActions from '../../price.NgRx/price.action';
import * as CartFoodItemsActions from '../../cart-food-items.ngrx/cart-food-items.action';

import { FoodItem, FoodItemInCart } from '../../models/food-item.model';
import { FoodService } from 'src/app/services/food.service';
import { FoodItemInformation } from 'src/app/models/food-item-information.model';

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

  public foodItemsIds$: Subject<number> = new Subject<number>();
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

    this.foodItemsIds$
      .pipe(
        switchMap((id: number) =>
          this.foodItemService.getFoodItemInformation$(id)
        )
      )
      .subscribe((foodInfo: FoodItemInformation) => console.log(foodInfo));
  }

  searchedFoodItemName(foodName: string): void {
    this.foodItemNamePattern$.next(foodName);
  }

  searchedFastFoodRestaurantName(fastFoodRestaurant: string): void {
    this.specificFastFoodRestaurant$.next(fastFoodRestaurant);
  }

  addToCart(foodItem: FoodItem): void {
    // console.log(foodItem);
    const foodToAdd = { ...foodItem };
    foodToAdd.idInCart = this.numberOfItemsInCart++;
    this.foodItemsIds$.next(foodItem.id); //proveri

    this.cartFoodItemsStore.dispatch(
      CartFoodItemsActions.addNewFoodItemToCart({
        foodItemToAdd: foodToAdd,
        getDescipritonOfFood: this.foodItemService.getFoodItemInformation$,
      })
    );

    this.store.dispatch(PriceActions.addToPrice({ price: foodToAdd.price }));
  }

  removeFromCart(foodItem: FoodItem): void {
    this.cartFoodItemsStore.dispatch(
      CartFoodItemsActions.removeFoodItemFromCart({
        foodItemToRemove: foodItem,
      })
    );
    this.store.dispatch(
      PriceActions.removeFromPrice({ price: foodItem.price })
    );
  }
}
