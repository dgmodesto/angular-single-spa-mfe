import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Address } from 'src/app/shared/models/address';

import { AdvisorService } from 'src/app/shared/services/advisor/advisor.service';
import { Advisor } from '../../models/advisor';

@Injectable()
export class AdvisorResolve implements Resolve<Advisor> {

  constructor(private advisorService: AdvisorService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Advisor> {

    const advisor = new Advisor();
    advisor.id = '1';
    advisor.name = 'Douglas Gomes Modesto';
    advisor.document = '341.898.718-42';
    advisor.enable = true;
    advisor.address = new Address();
    advisor.address.cep = '03015000';
    advisor.address.city = 'São Paulo';
    advisor.address.state = 'SP';
    advisor.address.number = '50';
    advisor.address.district = 'Brás';
    advisor.address.id = '1';
    advisor.address.publicPlace = 'Avenida Celso Garcia';


    const myObservable = of(advisor);

    return myObservable;

  }
}
