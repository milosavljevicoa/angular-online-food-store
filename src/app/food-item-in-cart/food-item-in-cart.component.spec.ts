import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemInCartComponent } from './food-item-in-cart.component';

describe('FoodItemInCartComponent', () => {
  let component: FoodItemInCartComponent;
  let fixture: ComponentFixture<FoodItemInCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemInCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemInCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
