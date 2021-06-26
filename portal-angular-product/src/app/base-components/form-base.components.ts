import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from '../shared/utils/generic-form-validation';

export abstract class FormBaseComponent {
  displayMessage: DisplayMessage = {};
  validationMessages: ValidationMessages = {};
  genericValidator: GenericValidator = new GenericValidator(
    this.validationMessages
  );

  changeNoSave = false;

  protected configureMessagesValidationBase(
    validationMessages: ValidationMessages
  ): void {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configureValidationFormBase(
    formInputElements: ElementRef[],
    formGroup: FormGroup
  ): void {
    const controlBlurs: Observable<any>[] = formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.validateForm(formGroup);
    });
  }

  protected validateForm(formGroup: FormGroup): void {
    this.displayMessage = this.genericValidator.processMessage(formGroup);
    this.changeNoSave = true;
  }
}
