import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from '../food-item';
import { Observable, Subject } from 'rxjs';
import { FoodItemsService } from '../food-items.service';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-food-item',
  templateUrl: './search-food-item.component.html',
  styleUrls: ['./search-food-item.component.css'],
})
export class SearchFoodItemComponent implements OnInit {
  @Output() addToCart: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();

  foodItems$: Observable<FoodItem[]>;
  private searchTerms = new Subject<string>();

  constructor(private foodItemService: FoodItemsService) {}

  ngOnInit(): void {
    this.foodItems$ = this.searchTerms.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      switchMap((foodItem: string) =>
        this.foodItemService.searchFoodItem(foodItem)
      )
    );
  }

  addToCartBtnClick(selectedFoodItem: FoodItem) {
    this.addToCart.emit(selectedFoodItem);
  }

  search(foodItemName: string) {
    this.searchTerms.next(foodItemName);
  }

  showAllFoodItems() {
    this.searchTerms.next(this.foodItemService.showAllFoodItemsString);
  }
}
