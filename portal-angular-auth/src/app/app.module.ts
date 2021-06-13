import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [HttpClientModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/angular-auth' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
