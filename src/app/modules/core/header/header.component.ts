import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IUser } from '../../model/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn?: Observable<boolean>;
  user?: Observable<IUser>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn$;
    this.user = this.userService.loggedInUser$;
  }
  
  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/home');
  }
}
