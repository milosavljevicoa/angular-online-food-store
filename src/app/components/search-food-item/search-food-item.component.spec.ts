import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodItemComponent } from './search-food-item.component';

describe('SearchFoodItemComponent', () => {
  let component: SearchFoodItemComponent;
  let fixture: ComponentFixture<SearchFoodItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFoodItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
