import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem, FoodItemInCart } from 'src/app/models/food-item.model';
import { FoodItemInformation } from 'src/app/models/food-item-information.model';

@Component({
  selector: 'app-food-item-in-cart',
  templateUrl: './food-item-in-cart.component.html',
  styleUrls: ['./food-item-in-cart.component.css'],
})
export class FoodItemInCartComponent implements OnInit {
  @Input() public foodItemInCart: FoodItemInCart;
  @Output() removeFoodItemInCart: EventEmitter<
    FoodItemInCart
  > = new EventEmitter<FoodItemInCart>();

  public foodItem: FoodItem;
  public foodInfo: FoodItemInformation;
  public countOfSameFood: number;

  public isModalDisplayed: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isModalDisplayed = false;
    this.foodItem = this.foodItemInCart.food;
    this.foodInfo = this.foodItemInCart.info;
    this.countOfSameFood = this.foodItemInCart.countOfSameFood;
  }

  btnClickDisplayModal() {
    this.isModalDisplayed = !this.isModalDisplayed;
  }

  displayModal(): string {
    if (this.isModalDisplayed) {
      return 'block';
    } else return 'none';
  }

  public removeFromCart(): void {
    this.removeFoodItemInCart.emit(this.foodItemInCart);
  }
}
