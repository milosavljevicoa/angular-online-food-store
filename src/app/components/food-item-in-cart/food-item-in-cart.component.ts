import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from 'src/app/models/food-item';

@Component({
  selector: 'app-food-item-in-cart',
  templateUrl: './food-item-in-cart.component.html',
  styleUrls: ['./food-item-in-cart.component.css'],
})
export class FoodItemInCartComponent implements OnInit {
  @Input() public foodItem: FoodItem;
  @Input() public orderId: number;
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  public removeFromCart(): void {
    this.remove.emit(this.orderId);
  }
}
