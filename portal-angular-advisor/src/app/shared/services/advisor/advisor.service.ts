import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, CepSearch } from 'src/app/shared/models/address';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { Advisor } from '../../models/advisor';


@Injectable({
  providedIn: 'root'
})
export class AdvisorService extends BaseService {

  advisor: Advisor = new Advisor();

  constructor(private http: HttpClient) { super(); }

  public getAll(): Observable<Advisor[]> {
    return this.http
      .get<Advisor[]>(this.UrlServiceV1 + 'advisor');
    // .pipe(catchError(super.serviceError));
  }

  public getById(id: string): Observable<Advisor> {
    return this.http
      .get<Advisor>(this.UrlServiceV1 + 'advisor/' + id);
    // .pipe(catchError(super.serviceError));
  }

  public addAdvisor(Advisor: Advisor): Observable<Advisor> {
    return this.http
      .post<Advisor>(this.UrlServiceV1 + 'advisor', Advisor);
  }

  public updateAdvisor(Advisor: Advisor): Observable<Advisor> {
    return this.http
      .put<Advisor>(this.UrlServiceV1 + 'advisor', Advisor);
  }



  public deleteAdvisor(id: string): Observable<Advisor> {
    return this.http
      .delete<Advisor>(this.UrlServiceV1 + 'advisor/' + id);
    // .pipe(catchError(super.serviceError));
  }


  updateAddress(address: Address): Observable<Address> {
    return this.http
      .put<Address>(this.UrlServiceV1 + 'Advisor/address/' + address.id, address);

  }


  searchCep(cep: string): Observable<CepSearch> {
    return this.http
      .get<CepSearch>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
