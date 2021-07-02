import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { mountRootParcel } from 'single-spa';
import { AuthGuard } from './shared/services/app/app.guard';
import { LocalStorageUtils } from './shared/utils/localstorage';
import { GlobalConstants } from '../globals';

@Component({
  selector: 'angular-product-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  utils = System.import('portal-angular-utils');
  config = {};
  mountRootParcel = mountRootParcel;
  customProps = {
    hello: 'Hola',
  };

  public eventDetail = '-';
  public hasAccessComponent: boolean = true;
  private localStorageUtils = new LocalStorageUtils();

  title = 'portal-angular-product';
  utilMethods: any;

  constructor(private ref: ChangeDetectorRef, private guardAuth: AuthGuard) {}

  ngOnInit(): void {
    this.listenEventMethod();
    this.verifyIfHasPermission();
  }

  private listenEventMethod(): void {
    debugger;
    GlobalConstants.utilMethod.listenEvent(
      '@dgmodesto/portal-angular-product/event-test',
      (event) => {
        console.log('portal-angular-product', event);
        this.eventDetail = event.detail.describe;
        this.ref.detectChanges();
      }
    );
  }

  private verifyIfHasPermission(): void {
    debugger;
    this.hasAccessComponent =
      GlobalConstants.utilMethod.verifyIfHasPermissionByClaim(
        this.guardAuth.claim.name,
        this.guardAuth.claim.value
      );
  }
}
