import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import * as XRegExp from 'xregexp';
import { IUser } from '../../model/IUser';
import { UserDto } from '../../model/UserDto';
import { rePasswordValidator } from '../utils/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage!: string;

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  registerFormGroup: FormGroup = this.fb.group({
    'firstName': new FormControl(null, [Validators.required, Validators.pattern(XRegExp('^[\\p{L}]{2,}$'))]),
    'lastName': new FormControl(null, [Validators.required, Validators.pattern(XRegExp('^[\\p{L}]{2,}$'))]),
    'email': new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\\.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/)]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [rePasswordValidator(this.passwordControl)]),
    })
  })

  passwordsGroup: FormGroup = this.registerFormGroup.controls['passwords'] as FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    const { firstName, lastName, email, passwords } = this.registerFormGroup.value;

    const userDto: IUser = new UserDto(0, firstName, lastName, email, passwords.password, passwords.rePassword, undefined);
    this.userService.register$(userDto).subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    })
  }

}
