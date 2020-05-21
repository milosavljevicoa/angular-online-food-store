import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from 'src/app/models/food-item';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css'],
})
export class FoodItemComponent implements OnInit {
  @Input() foodItemToDisplay: FoodItem;
  @Output() addToCart: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  public addItemToCart() {
    this.addToCart.emit();
  }
}
