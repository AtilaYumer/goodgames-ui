import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function fileValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        console.log(control.value);
        const valid = control.value !== null || control.value !== undefined;
        return valid ? null : { fileNotValid: { value: control.value } };
    };
}