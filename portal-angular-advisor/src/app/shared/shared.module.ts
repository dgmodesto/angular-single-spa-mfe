import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';

import { ParcelModule } from 'single-spa-angular/parcel';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ParcelModule
  ],
  exports: [
    ProductComponent
  ]
})
export class SharedModule { }
