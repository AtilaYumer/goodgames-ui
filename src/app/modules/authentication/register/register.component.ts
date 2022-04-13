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

    const userDto: IUser = new UserDto(firstName, lastName, email, passwords.password, passwords.rePassword);
    this.userService.register$(userDto).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

}
