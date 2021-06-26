import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ProductService } from 'src/app/shared/services/product/product.service';
import { Product } from '../../models/prodcut.model';

@Injectable()
export class ProductResolve implements Resolve<Product> {
  constructor(private ProductService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const product = new Product();

    product.id = '1';
    product.name = 'Douglas Gomes Modesto';
    product.description = '341.898.718-42';
    product.enable = true;

    const myObservable = of(product);

    return myObservable;
  }
}
