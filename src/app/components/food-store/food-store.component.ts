import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/models/food-item';

@Component({
  selector: 'app-food-store',
  templateUrl: './food-store.component.html',
  styleUrls: ['./food-store.component.css'],
})
export class FoodStoreComponent implements OnInit {
  foodItemsInCart!: FoodItem[];
  priceOfOrder!: number;

  constructor() {}

  ngOnInit(): void {
    this.priceOfOrder = 0;
    this.foodItemsInCart = new Array();
  }

  addToCart(foodItem: FoodItem): void {
    this.foodItemsInCart.push(foodItem);
    this.calculatePriceOfOrder();
  }

  removeFromCart(foodItem: FoodItem): void {
    const index: number = this.foodItemsInCart.indexOf(foodItem);
    if (index >= 0) {
      this.foodItemsInCart.splice(index, 1);
    }

    // this.foodItemsInCart = this.foodItemsInCart.filter(
    //   (foodItemInCart: FoodItem) => foodItem.id !== foodItemInCart.id
    // );
    this.calculatePriceOfOrder();
  }

  calculatePriceOfOrder() {
    this.priceOfOrder = 0;
    this.foodItemsInCart.forEach((foodItemInCart: FoodItem) => {
      this.priceOfOrder += foodItemInCart.price;
    });
  }
}
