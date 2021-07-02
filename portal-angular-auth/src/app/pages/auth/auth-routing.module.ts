import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAppComponent } from './auth.app.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthAppComponent,
    children: [
      { 
        path: 'login', component: LoginComponent
      },
      {
        path: 'nova-senha', component: ResetPasswordComponent
      },
      {
        path: 'novo-usuario', component: NewUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
