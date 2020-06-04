import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-search-food-item',
  templateUrl: './search-food-item.component.html',
  styleUrls: ['./search-food-item.component.css'],
})
export class SearchFoodItemComponent implements OnInit {
  private nameOfFoodItemToSearch$: Subject<string> = new Subject<string>();

  public fastFoodRestaurants: string[];
  public selectedFastFood: string;

  @Input() allFastFoodRestaurants$: Observable<Array<string>>;

  @Output() fastFoodRestaurantEmitter: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() foodItemToSearchEmitter: EventEmitter<string> = new EventEmitter<
    string
  >();

  constructor() {}

  ngOnInit(): void {
    this.allFastFoodRestaurants$.subscribe(
      (allFastFoodRestaurants: Array<string>) => {
        this.fastFoodRestaurants = [
          FoodService.ALL_RESTAURANTS,
          ...allFastFoodRestaurants,
        ];
      }
    );

    this.nameOfFoodItemToSearch$
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((nameOfFoodItem: string) => {
        this.foodItemToSearchEmitter.emit(nameOfFoodItem);
      });
  }

  searchGivenFastFoodRestaurant(fastFoodRestaurant: string) {
    this.fastFoodRestaurantEmitter.emit(fastFoodRestaurant);
  }

  searchFoodItemByName(foodItemName: string) {
    this.nameOfFoodItemToSearch$.next(foodItemName);
  }
}
