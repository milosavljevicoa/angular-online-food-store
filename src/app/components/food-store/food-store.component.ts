import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../../models/food-item.model';
import { Observable } from 'rxjs';
import * as PriceActions from '../../actions/price.action';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-food-store',
  templateUrl: './food-store.component.html',
  styleUrls: ['./food-store.component.css'],
})
export class FoodStoreComponent implements OnInit {
  private numberOfItemsInCart: number;

  public foodItemsInCart: Array<FoodItem>;
  public priceOfOrder$: Observable<number>;

  constructor(private store: Store<{ price: number }>) {
    this.priceOfOrder$ = store.pipe(select('price'));
  }

  ngOnInit(): void {
    this.numberOfItemsInCart = 0;
    this.foodItemsInCart = new Array<FoodItem>();
  }

  ngAfterViewInit(): void {}

  addToCart(foodItem: FoodItem): void {
    const newFoodInCart = { ...foodItem };
    newFoodInCart.idInCart = this.numberOfItemsInCart++;
    this.foodItemsInCart.push(newFoodInCart);
    this.store.dispatch(
      PriceActions.addToPrice({ price: newFoodInCart.price })
    );
  }

  removeFromCart(foodItem: FoodItem): void {
    let priceOfTheFoodToRemove: number = foodItem.price;
    this.foodItemsInCart = this.foodItemsInCart.filter(
      (cartFoodItem: FoodItem) => cartFoodItem.idInCart !== foodItem.idInCart
    );
    this.store.dispatch(
      PriceActions.removeFromPrice({ price: priceOfTheFoodToRemove })
    );
  }
}
