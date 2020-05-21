import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from '../services/in-memory-data.service';
import { AppComponent } from '../components/app.component';
import { FoodStoreComponent } from '../components/food-store/food-store.component';
import { FoodItemComponent } from '../components/food-item/food-item.component';
import { FoodItemInCartComponent } from '../components/food-item-in-cart/food-item-in-cart.component';
import { SearchFoodItemComponent } from '../components/search-food-item/search-food-item.component';

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
