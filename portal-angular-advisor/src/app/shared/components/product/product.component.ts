import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import {
  Component,
  OnDestroy,
  OnInit,
  SystemJsNgModuleLoader,
} from '@angular/core';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { mountRootParcel, UNMOUNTING } from 'single-spa';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public config: System.Module;
  public mountRootParcel = mountRootParcel;
  public customProps = {
    hello: 'Hola',
  };

  constructor() {}

  ngOnInit(): void {
    this.config = () => System.import('@dgmodesto/portal-angular-product');
  }
}
