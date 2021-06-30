import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/app/app.guard';
import { AdvisorAppComponent } from './advisor.app.component';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';

const routes: Routes = [
  {
    path: '',
    component: AdvisorAppComponent,
    children: [
      { path: 'list', component: ListComponent },
      {
        path: 'new',
        component: NewComponent,
        canActivate: [AuthGuard],
        data: [
          {
            claim: {
              name: 'Novo-Assessor',
              value: '27258c00-7494-4e2a-914b-a0b1658dbaas',
            },
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvisorRoutingModule {}
