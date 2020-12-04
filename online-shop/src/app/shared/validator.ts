import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rePasswordValidatorFactory(targetControl: AbstractControl): ValidatorFn {
    return function rePasswordValidator(control: AbstractControl): ValidationErrors | null {
        const areTheSame = targetControl.value === control.value;
        return areTheSame ? null : { rePasswordValidator: true };
    };
}

export function imageValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value as string);
    if (!value) { return null; }
    const imageIsValid = value.startsWith('http://') || value.startsWith('https://');
    return imageIsValid ? null : { imageValidator: true };
}
