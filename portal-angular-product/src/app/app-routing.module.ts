import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/services/app/app.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
    // data: [{ claim: { nome: 'Produto', valor: '27258c00-7494-4e2a-914b-a0b1658dbade' } }
    // ]
  },

  { path: 'acesso-negado', component: ForbiddenComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
