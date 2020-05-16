import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from '../food-item';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css'],
})
export class FoodItemComponent implements OnInit {
  @Input() foodItem: FoodItem;
  @Output() addToCart: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();
  constructor() {}

  ngOnInit(): void {}

  public addItemToCart() {
    this.addToCart.emit(this.foodItem);
  }
}
