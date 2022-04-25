import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IRootState } from 'src/app/+store';
import { UserService } from 'src/app/services/user.service';
import { IUser } from '../../model/IUser';
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$: Observable<IUser | undefined> = this.store.select(routeState => routeState.currentUser);
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user));


  constructor(private userService: UserService, private router: Router, private store: Store<IRootState>) { }

  ngOnInit(): void { }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/home');
  }
}
