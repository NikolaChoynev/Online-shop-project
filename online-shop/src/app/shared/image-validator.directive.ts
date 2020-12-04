import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { imageValidator } from './validator';

@Directive({
  selector: '[ngModel] [appImageValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ImageValidatorDirective
    }
  ]
})
export class ImageValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    return imageValidator(control);
  }

}
