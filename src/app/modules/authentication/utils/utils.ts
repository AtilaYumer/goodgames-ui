import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as XRegExp from "xregexp";

export function rePasswordValidator(passwordFormControl: AbstractControl) {
    const validtorFn: ValidatorFn = (rePasswordFormControl: AbstractControl) => {
        if (passwordFormControl.value !== rePasswordFormControl.value) {
            return {
                passwordMissmatch: true
            }
        }
        return null;
    }
    return validtorFn;
}

export function forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        console.log(control.value);
        const valid = XRegExp('^[\\p{L}]{2,}$').test(control.value);
        console.log(valid);
        return valid ? null : { forbiddenName: { value: control.value } };
    };
}