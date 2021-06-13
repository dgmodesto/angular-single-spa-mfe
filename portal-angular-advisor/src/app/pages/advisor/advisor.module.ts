import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvisorRoutingModule } from './advisor-routing.module';
import { ListComponent } from './components/list/list.component';
import { AdvisorAppComponent } from './advisor.app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from './components/new/new.component';
import { NgBrazil } from 'ng-brazil';

import { NgxSpinnerModule } from 'ngx-spinner';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    AdvisorAppComponent,
    ListComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    AdvisorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule
  ]
})
export class AdvisorModule { }
