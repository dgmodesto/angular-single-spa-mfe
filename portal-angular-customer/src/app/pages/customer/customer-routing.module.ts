import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAppComponent } from './customer.app.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '', component: CustomerAppComponent,
    children: [
      { path: 'list', component: ListComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
