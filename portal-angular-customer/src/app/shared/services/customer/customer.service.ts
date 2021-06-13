import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {

  customer: Customer = new Customer();

  constructor(private http: HttpClient) { super(); }

  public getAll(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(this.UrlServiceV1 + 'customers');
    // .pipe(catchError(super.serviceError));
  }
}
