import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './services/in-memory-data.service';
import { AppComponent } from './components/app.component';
import { FoodStoreComponent } from './components/food-store/food-store.component';
import { FoodItemComponent } from './components/food-item/food-item.component';
import { FoodItemInCartComponent } from './components/food-item-in-cart/food-item-in-cart.component';
import { SearchFoodItemComponent } from './components/search-food-item/search-food-item.component';
import { BurgersAsPriceComponent } from './components/burgers-as-price/burgers-as-price.component';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { priceReducer } from './price.ngrx/price.reducer';
import { cartFoodItemsReducer } from './cart-food-items.ngrx/cart-food-items.reducer';
import { CartFoodItemsEffects } from './cart-food-items.ngrx/cart-food-items.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

const reducers: ActionReducerMap<any> = {
  price: priceReducer,
  cartFoodItems: cartFoodItemsReducer,
};

@NgModule({
  declarations: [
    AppComponent,
    FoodStoreComponent,
    FoodItemComponent,
    FoodItemInCartComponent,
    SearchFoodItemComponent,
    BurgersAsPriceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CartFoodItemsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
