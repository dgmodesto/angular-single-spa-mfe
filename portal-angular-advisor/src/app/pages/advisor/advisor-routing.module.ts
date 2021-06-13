import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvisorAppComponent } from './advisor.app.component';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';

const routes: Routes = [
  {
    path: '', component: AdvisorAppComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'new', component: NewComponent },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvisorRoutingModule { }
