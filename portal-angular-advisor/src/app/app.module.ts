import { APP_BASE_HREF } from '@angular/common';
import { ApplicationRef, DoBootstrap, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdvisorModule } from './pages/advisor/advisor.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { GlobalConstants } from '../globals';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, ForbiddenComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AdvisorModule,
    SharedModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/portal/angular-advisor' }],
  // bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    System.import('@dgmodesto/portal-angular-utils').then((result) => {
      GlobalConstants.utilMethod = result;

      appRef.bootstrap(AppComponent);
    });
  }
}
