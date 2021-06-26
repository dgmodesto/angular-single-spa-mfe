import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BaseGuard } from '../base/base.guard';

@Injectable()
export class AuthGuard extends BaseGuard implements CanLoad, CanActivate {
  user = { admin: true, logged: false };
  claim = {
    name: 'Produto',
    value: '27258c00-7494-4e2a-914b-a0b1658dbade',
  };

  constructor(protected router: Router) {
    super(router);
  }

  canLoad(): boolean {
    return this.user.admin;
  }

  canActivate(routeAc: ActivatedRouteSnapshot): boolean {
    debugger;
    return super.validarClaims(routeAc);
  }
}
