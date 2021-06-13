import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, SystemJsNgModuleLoader } from '@angular/core';
import { mountRootParcel } from 'single-spa';

@Component({
  selector: 'angular-product-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  utils = System.import('@dgmodesto/portal-angular-utils');
  config = {};
  mountRootParcel = mountRootParcel;
  customProps = {
    hello: 'Hola',
  };
  public eventDetail = "-";

  title = 'portal-angular-product';
  listenerEvents: any;


  constructor(private ref: ChangeDetectorRef) {
    this.utils
      .then(u => {
        this.listenerEvents = u;
        this.listenEventMethod();
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  listenEventMethod() {

    this.listenerEvents.listenEvent('@dgmodesto/portal-angular-product/event-test', event => {
      console.log('portal-angular-product', event);
      this.eventDetail = event.detail.describe;
      this.ref.detectChanges();

    });
  }


  ngOnDestroy(): void {
    debugger
    const appName = 'app-product'
    const element = document.getElementById(`single-spa-application:${appName}`);
    element.innerHTML = "";
  }




}
