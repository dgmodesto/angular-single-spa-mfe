import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { mountRootParcel } from 'single-spa';
import { AuthGuard } from './shared/services/app/app.guard';
import { LocalStorageUtils } from './shared/utils/localstorage';

@Component({
  selector: 'angular-product-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  utils = System.import('@dgmodesto/portal-angular-utils');
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

  constructor(private ref: ChangeDetectorRef, private guardAuth: AuthGuard) {
    this.utils
      .then((u) => {
        this.utilMethods = u;
        this.listenEventMethod();
        this.verifyIfHasPermission();
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  ngOnInit(): void {}

  private listenEventMethod(): void {
    this.utilMethods.listenEvent(
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
    this.hasAccessComponent = this.utilMethods.verifyIfHasPermissionByClaim(
      this.guardAuth.claim.name,
      this.guardAuth.claim.value
    );

    // let user = this.localStorageUtils.obterUsuario();

    // if (!user.claims) {
    //   this.hasAccessComponent = false;
    //   return;
    // }

    // let userClaims = user.claims.find(
    //   (x) => x.type === this.guardAuth.claim.name
    // );

    // if (!userClaims) {
    //   this.hasAccessComponent = false;
    //   return;
    // }

    // let valoresClaim = userClaims.value as string;

    // if (!valoresClaim.includes(this.guardAuth.claim.value)) {
    //   this.hasAccessComponent = false;
    //   return;
    // }
  }
}
