import {
  ChangeDetectionStrategy,
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
  emitEventUtil: System.Module;
  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    var utils = System.import('portal-angular-utils');

    utils
      .then((u) => {
        this.emitEventUtil = u;
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      description: ['', [Validators.required]],
    });
  }

  public emitEventMethod() {
    const describe =
      'teste de eventos entre microfrontend, [DE]: portal-angular-advisor - [PARA]: portal-angular-product - [VALOR]: ' +
      this.eventForm.controls.description.value;

    this.emitEventUtil.emitEvent(
      '@dgmodesto/portal-angular-product/event-test',
      {
        id: 0,
        describe: describe,
      }
    );
  }
}
