import { FormGroup } from '@angular/forms';


export class GenericValidator {
  /**
   *
   */
  constructor(private validationMessages: ValidationMessages) { }

  processMessage(container: FormGroup): { [key: string]: string } {
    const messages: any = {};

    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey];

        if (c instanceof FormGroup) {
          const childMessages = this.processMessage(c);
          Object.assign(messages, childMessages);
        }
        else {
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + '<br />';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }


}

export interface DisplayMessage {
  [key: string]: string;
}

export interface ValidationMessages {
  [key: string]: { [key: string]: string };
}
