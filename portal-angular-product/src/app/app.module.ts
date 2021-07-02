import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApplicationRef,
  CUSTOM_ELEMENTS_SCHEMA,
  DoBootstrap,
  NgModule,
} from '@angular/core';

import { AppComponent } from './app.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from './shared/services/app/app.guard';
import { ActivatedRouteSnapshot } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { GlobalConstants } from 'src/globals';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ForbiddenComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  exports: [CommonModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }, AuthGuard],
  // bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    System.import('portal-angular-utils').then((result) => {
      debugger;
      GlobalConstants.utilMethod = result;

      appRef.bootstrap(AppComponent);
    });
  }
}
