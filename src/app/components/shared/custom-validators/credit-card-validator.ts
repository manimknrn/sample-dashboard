import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function creditCardValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value ? control.value.replace(/\s/g, '') : '';
    
    // Check if the value is exactly 16 digits
    const valid = /^\d{16}$/.test(value);

    return valid ? null : { invalidCreditCard: true };
  };
}
