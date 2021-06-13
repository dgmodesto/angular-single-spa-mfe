import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  protected UrlServiceV1: string = environment.apiUrlv1;
  public LocalStorage = new LocalStorageUtils();

  protected getHeaderJson(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected getAuthHeaderJson(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.LocalStorage.obterTokenUsuario()}`
      })
    };
  }

  protected extractData(response: any): any {
    return response.data || {};
  }

  protected serviceError(response: Response | any): any {
    const customError: string[] = [];
    const customResponse = { error: { errors: [] } } as any;

    if (response instanceof HttpErrorResponse) {

      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }
    if (response.status === 500) {
      customError.push('Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.');

      // Erros do tipo 500 não possuem uma lista de erros
      // A lista de erros do HttpErrorResponse é readonly
      customResponse.error.errors = customError;
      return throwError(customResponse);
    }

    console.error(response);
    return throwError(response);
  }
}
