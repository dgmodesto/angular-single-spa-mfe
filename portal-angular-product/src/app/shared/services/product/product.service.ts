import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { Product } from '../../models/prodcut.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  Product: Product = new Product();

  constructor(private http: HttpClient) {
    super();
  }

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.UrlServiceV1 + 'product');
    // .pipe(catchError(super.serviceError));
  }

  public getById(id: string): Observable<Product> {
    return this.http.get<Product>(this.UrlServiceV1 + 'product/' + id);
    // .pipe(catchError(super.serviceError));
  }

  public addProduct(Product: Product): Observable<Product> {
    return this.http.post<Product>(this.UrlServiceV1 + 'product', Product);
  }

  public updateProduct(Product: Product): Observable<Product> {
    return this.http.put<Product>(this.UrlServiceV1 + 'product', Product);
  }

  public deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.UrlServiceV1 + 'product/' + id);
    // .pipe(catchError(super.serviceError));
  }
}
