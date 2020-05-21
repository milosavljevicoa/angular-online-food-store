import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-burgers-as-price',
  templateUrl: './burgers-as-price.component.html',
  styleUrls: ['./burgers-as-price.component.css'],
})
export class BurgersAsPriceComponent implements OnInit {
  @Input() priceOfOrder$: Subject<number>;
  public howManyToDisplay$: Observable<Array<null>>;

  private priceToAddNewBurger: number;

  constructor() {
    this.priceToAddNewBurger = 500;
  }

  ngOnInit(): void {
    this.howManyToDisplay$ = this.priceOfOrder$.pipe(
      map((price: number) => Math.floor(price / this.priceToAddNewBurger)),
      map((howManyBurgersToDisplay: number) =>
        this.createNgIteration(howManyBurgersToDisplay)
      )
    );
  }

  private createNgIteration(numberOfElements: number): Array<null> {
    return Array(numberOfElements).fill(0);
  }
}
