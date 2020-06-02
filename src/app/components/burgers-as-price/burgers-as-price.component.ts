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
  private priceToAddNewBurgerIcon: number;

  public howManyIconsToDisplay$: Observable<Array<null>>;

  constructor(private store: Store<{ price: number }>) {}

  ngOnInit(): void {
    this.priceToAddNewBurgerIcon = 500;

    this.howManyIconsToDisplay$ = this.store.pipe(
      select('price'),
      mergeMap((price: number) =>
        this.convertPriceToBurgerIconsToDisplay$(price)
      )
    );
  }

  private convertPriceToBurgerIconsToDisplay$(
    price: number
  ): Observable<Array<null>> {
    let numberOfBurgersIconsToDisplay = Math.floor(
      price / this.priceToAddNewBurgerIcon
    );
    return of(this.createNgIterator(numberOfBurgersIconsToDisplay));
  }

  private createNgIterator(numberOfElements: number): Array<null> {
    return Array(numberOfElements).fill(0);
  }
}
