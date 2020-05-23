import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/models/food-item.model';
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

  // ngAfterViewInit(): void {
  //   this.priceOfOrder$.next(0);
  // }

  addToCart(foodItem: FoodItem): void {
    const newFoodInCart = { ...foodItem };
    newFoodInCart.idInCart = this.numberOfItemsInCart++;
    this.foodItemsInCart.push(newFoodInCart);
    this.store.dispatch(
      PriceActions.addToPrice({ price: newFoodInCart.price })
    );
    console.log(this.foodItemsInCart);
  }

  removeFromCart(foodItem: FoodItem): void {
    console.log(foodItem);
    console.log(this.foodItemsInCart);
    let priceOfTheFoodToRemove: number = foodItem.price;
    this.foodItemsInCart = this.foodItemsInCart.filter(
      (cartFoodItem: FoodItem) => {
        console.log(cartFoodItem);
        return cartFoodItem.idInCart !== foodItem.idInCart;
      }
    );
    this.store.dispatch(
      PriceActions.removeFromPrice({ price: priceOfTheFoodToRemove })
    );
  }
}
