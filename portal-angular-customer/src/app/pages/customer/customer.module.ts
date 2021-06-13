import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListComponent } from './components/list/list.component';
import { CustomerAppComponent } from './customer.app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { CustomerResolve } from 'src/app/shared/services/customer/customer.resolve';


@NgModule({
  declarations: [
    CustomerAppComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers: [
    CustomerService,
    CustomerResolve
  ]
})
export class ClientModule { }

