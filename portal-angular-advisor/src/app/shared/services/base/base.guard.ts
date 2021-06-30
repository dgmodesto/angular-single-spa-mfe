import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { singleSpaAngular } from 'single-spa-angular';
import { LocalStorageUtils } from '../../utils/localstorage';
import { GlobalConstants } from '../../../../globals';

export abstract class BaseGuard {
  private localStorageUtils = new LocalStorageUtils();
  utils = System.import('@dgmodesto/portal-angular-utils');

  constructor(protected router: Router) {}

  protected validarClaims(routeAc: ActivatedRouteSnapshot): boolean {
    if (!this.localStorageUtils.obterTokenUsuario()) {
      debugger;
      // this.router.navigate(['/angular-auth'], {
      //   queryParams: { returnUrl: this.router.url },
      // });

      window.location.href = "/angular-auth'";
    }

    let claim: any = routeAc.data[0];
    if (claim !== undefined) {
      let claim = routeAc.data[0]['claim'];
      var teste = GlobalConstants.utilMethod.verifyIfHasPermissionByClaim(
        claim.name,
        claim.value
      );

      if (!teste) {
        this.navegarAcessoNegado();
      }
    }

    return true;
  }

  private navegarAcessoNegado() {
    this.router.navigate(['acesso-negado']);
  }
}
