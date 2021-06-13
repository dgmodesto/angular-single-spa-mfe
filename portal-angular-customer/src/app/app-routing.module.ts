import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { CustomerAppComponent } from './pages/customer/customer.app.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      {
        path: 'customer',
        loadChildren: () => import('./pages/customer/customer.module')
          .then(m => m.ClientModule)
      },
    ]
  },

  { path: '**', component: EmptyRouteComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
