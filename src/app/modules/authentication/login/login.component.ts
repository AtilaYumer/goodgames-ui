import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginDto } from '../../model/LoginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = this.fb.group({
    'email': new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\\.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/)]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(5)])
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    const { email, password } = this.loginFormGroup.value;
    const loginDto: LoginDto = new LoginDto(email, password);
    this.userService.login$(loginDto).subscribe({ 
      next: (resp) => {
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

}
