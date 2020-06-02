import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem, FoodItemInCart } from '../../models/food-item.model';

@Component({
  selector: 'app-food-item-in-cart',
  templateUrl: './food-item-in-cart.component.html',
  styleUrls: ['./food-item-in-cart.component.css'],
})
export class FoodItemInCartComponent implements OnInit {
  @Input() public foodItemInCart: FoodItemInCart;
  @Output() remove: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();
  public foodItem: FoodItem;
  public countOfSameFood: number;

  constructor() {}

  ngOnInit(): void {
    this.foodItem = this.foodItemInCart.food;
    this.countOfSameFood = this.foodItemInCart.countOfSameFood;
  }

  public removeFromCart(): void {
    this.remove.emit(this.foodItem);
  }
}
