import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthAppComponent } from './auth.app.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AuthAppComponent, 
    LoginComponent, 
    ResetPasswordComponent, 
    NewUserComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AuthAppComponent, 
    LoginComponent, 
    ResetPasswordComponent, 
  ]
})
export class AuthModule { }
