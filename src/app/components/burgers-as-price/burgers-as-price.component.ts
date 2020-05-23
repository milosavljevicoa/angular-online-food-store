import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-burgers-as-price',
  templateUrl: './burgers-as-price.component.html',
  styleUrls: ['./burgers-as-price.component.css'],
})
export class BurgersAsPriceComponent implements OnInit {
  public howManyToDisplay$: Observable<Array<null>>;

  private priceToAddNewBurger: number;

  constructor(private store: Store<{ price: number }>) {
    this.priceToAddNewBurger = 500;

    this.howManyToDisplay$ = store.pipe(
      select('price'),
      mergeMap((price: number) => this.convertPriceToBurgersToDisplay$(price))
    );
  }

  private convertPriceToBurgersToDisplay$(
    price: number
  ): Observable<Array<null>> {
    let numberOfBurgersToDisplay = Math.floor(price / this.priceToAddNewBurger);
    return of(this.createNgIteration(numberOfBurgersToDisplay));
  }

  private createNgIteration(numberOfElements: number): Array<null> {
    return Array(numberOfElements).fill(0);
  }

  ngOnInit(): void {}
}
