import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../food-item';
import { FoodItemsService } from '../food-items.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-food-store',
  templateUrl: './food-store.component.html',
  styleUrls: ['./food-store.component.css'],
})
export class FoodStoreComponent implements OnInit {
  foodItems: FoodItem[];
  foodItemsInCart: FoodItem[];
  priceOfOrder: number;

  constructor(private foodItemsService: FoodItemsService) {}

  ngOnInit(): void {
    this.getFoodItems();
    this.priceOfOrder = 0;
    this.foodItemsInCart = new Array();
  }

  getFoodItems(): void {}

  addToCart(foodItem: FoodItem): void {
    this.foodItemsInCart.push(foodItem);
    this.calculatePriceOfOrder();
  }

  removeFromCart(foodItem: FoodItem): void {
    this.foodItemsInCart = this.foodItemsInCart.filter(
      (foodItemInCart: FoodItem) => foodItem.id !== foodItemInCart.id
    );
    this.calculatePriceOfOrder();
  }

  calculatePriceOfOrder() {
    this.priceOfOrder = 0;
    this.foodItemsInCart.forEach((foodItemInCart: FoodItem) => {
      this.priceOfOrder += foodItemInCart.price;
    });
  }
}
