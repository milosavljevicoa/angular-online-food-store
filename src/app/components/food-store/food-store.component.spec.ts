import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodStoreComponent } from './food-store.component';

describe('FoodStoreComponent', () => {
  let component: FoodStoreComponent;
  let fixture: ComponentFixture<FoodStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FoodStoreComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
