import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  SystemJsNgModuleLoader,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mountRootParcel, Parcel } from 'single-spa';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  utils = System.import('@dgmodesto/portal-angular-utils');
  config = {};
  mountRootParcel = mountRootParcel;
  customProps = {
    hello: 'Hola',
  };
  public eventDetail = '-';

  title = 'portal-angular-product';
  listenerEvents: any;

  constructor(private ref: ChangeDetectorRef) {
    this.utils
      .then((u) => {
        this.listenerEvents = u;
        this.listenEventMethod();
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  ngOnInit(): void {
  }

  listenEventMethod() {
    this.listenerEvents.listenEvent(
      '@dgmodesto/portal-angular-product/event-test',
      (event) => {
        console.log('portal-angular-product', event);
        this.eventDetail = event.detail.describe;
        this.ref.detectChanges();
      }
    );
  }
}
