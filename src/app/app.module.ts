import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './in-memory-data.service';
import { AppComponent } from './app.component';
import { FoodStoreComponent } from './food-store/food-store.component';
import { FoodItemComponent } from './food-item/food-item.component';
import { FoodItemInCartComponent } from './food-item-in-cart/food-item-in-cart.component';
import { SearchFoodItemComponent } from './search-food-item/search-food-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodStoreComponent,
    FoodItemComponent,
    FoodItemInCartComponent,
    SearchFoodItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
