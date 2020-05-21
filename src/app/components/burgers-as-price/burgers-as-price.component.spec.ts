import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgersAsPriceComponent } from './burgers-as-price.component';

describe('BurgersAsPriceComponent', () => {
  let component: BurgersAsPriceComponent;
  let fixture: ComponentFixture<BurgersAsPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurgersAsPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgersAsPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
