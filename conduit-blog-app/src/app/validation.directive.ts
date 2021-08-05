import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appValidation]',
})
export class ValidationDirective {
  constructor() {}
}
export function userNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = nameRe.test(control.value);
    return pass ? null : { userName: { value: control.value } };
  };
}
