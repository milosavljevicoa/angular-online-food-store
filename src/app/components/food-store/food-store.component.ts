import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/models/food-item';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-food-store',
  templateUrl: './food-store.component.html',
  styleUrls: ['./food-store.component.css'],
})
export class FoodStoreComponent implements OnInit {
  private numberOfItemsInCart: number;

  public orderIdWithItemsInCart: Array<[number, FoodItem]>;
  public priceOfOrder$: Subject<number>;

  constructor() {}

  ngOnInit(): void {
    this.numberOfItemsInCart = 0;
    this.priceOfOrder$ = new Subject<number>();
    this.orderIdWithItemsInCart = new Array<[number, FoodItem]>();
  }

  // ngAfterViewInit(): void {
  //   this.priceOfOrder$.next(0);
  // }

  addToCart(foodItem: FoodItem): void {
    this.orderIdWithItemsInCart.push([this.numberOfItemsInCart, foodItem]);
    this.numberOfItemsInCart++;
    this.calculatePriceOfOrder();
  }

  removeFromCart(cartFoodItemId: number): void {
    this.orderIdWithItemsInCart = this.orderIdWithItemsInCart.filter(
      (cartFoodItem: [number, FoodItem]) => cartFoodItem[0] !== cartFoodItemId
    );

    this.calculatePriceOfOrder();
  }

  calculatePriceOfOrder() {
    let priceOfOrder: number = 0;
    this.orderIdWithItemsInCart.forEach((cartFoodItem: [number, FoodItem]) => {
      priceOfOrder += cartFoodItem[1].price;
    });
    this.priceOfOrder$.next(priceOfOrder);
  }
}
