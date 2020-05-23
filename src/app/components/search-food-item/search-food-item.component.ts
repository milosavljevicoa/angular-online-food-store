import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  take,
} from 'rxjs/operators';
import { FoodItem } from 'src/app/models/food-item.model';
import { FoodItemsService } from 'src/app/services/food-items.service';

@Component({
  selector: 'app-search-food-item',
  templateUrl: './search-food-item.component.html',
  styleUrls: ['./search-food-item.component.css'],
})
export class SearchFoodItemComponent implements OnInit {
  public fastFoodRestaurants: string[];
  public foodItemsToDisplay: FoodItem[];
  private searchTerms = new Subject<string>();
  public selectedFastFood: string;
  @Output() addToCart: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();

  constructor(private foodItemService: FoodItemsService) {}

  ngOnInit(): void {
    this.foodItemsToDisplay = [];
    this.fastFoodRestaurants = ['All'];
    this.selectedFastFood = this.fastFoodRestaurants[0];
    this.foodItemService
      .getFastFoodRestaurants()
      .subscribe((x) => this.fastFoodRestaurants.push(x));

    this.searchTerms
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        switchMap((foodItem: string) =>
          this.foodItemService.searchFoodItem(foodItem)
        )
      )
      .subscribe(
        (foodItemsToDisplay: FoodItem[]) =>
          (this.foodItemsToDisplay = foodItemsToDisplay)
      );
  }

  addToCartBtnClick(selectedFoodItem: FoodItem) {
    this.addToCart.emit(selectedFoodItem);
  }

  search(foodItemName: string) {
    this.searchTerms.next(foodItemName);
  }

  onChangeShowAllFoodItemsFromSelectedFastFoodRestaurants() {
    this.foodItemService
      .getAllFoodItemsFrom(this.selectedFastFood)
      .pipe(take(1))
      .subscribe(
        (foodItemsToDisplay: FoodItem[]) =>
          (this.foodItemsToDisplay = foodItemsToDisplay)
      );
  }
}
