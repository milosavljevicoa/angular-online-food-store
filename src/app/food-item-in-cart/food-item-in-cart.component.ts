import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from '../food-item';

@Component({
  selector: 'app-food-item-in-cart',
  templateUrl: './food-item-in-cart.component.html',
  styleUrls: ['./food-item-in-cart.component.css'],
})
export class FoodItemInCartComponent implements OnInit {
  @Input() foodItem: FoodItem;
  @Output() remove: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();
  constructor() {}

  ngOnInit(): void {}

  public removeFromCart(): void {
    this.remove.emit(this.foodItem);
  }
}
