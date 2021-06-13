import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Address } from '../../models/address';
import { Customer } from '../../models/customer';
import { CustomerService } from './customer.service';


@Injectable()
export class CustomerResolve implements Resolve<Customer> {

  constructor(private customerService: CustomerService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Customer> {

    const customer = new Customer();
    customer.id = '1';
    customer.name = 'Douglas Gomes Modesto';
    customer.document = '341.898.718-42';
    customer.enable = true;
    customer.address = new Address();
    customer.address.cep = '03015000';
    customer.address.city = 'São Paulo';
    customer.address.state = 'SP';
    customer.address.number = '50';
    customer.address.district = 'Brás';
    customer.address.customerId = '1';
    customer.address.publicPlace = 'Avenida Celso Garcia';


    const myObservable = of(customer);

    return myObservable;

  }
}
