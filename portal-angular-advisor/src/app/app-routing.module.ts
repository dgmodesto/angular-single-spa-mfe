import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../../../portal-angular-advisor/src/app/app.component';
import { EmptyRouteComponent } from '../../../portal-angular-advisor/src/app/empty-route/empty-route.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      {
        path: 'advisor',
        loadChildren: () => import('./pages/advisor/advisor.module')
          .then(m => m.AdvisorModule)
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
