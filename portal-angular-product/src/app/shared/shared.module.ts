import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';

import { ParcelModule } from 'single-spa-angular/parcel';
import { AuthGuard } from './services/app/app.guard';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, ParcelModule],
  exports: [ProductComponent],
  providers: [AuthGuard],
})
export class SharedModule {}
