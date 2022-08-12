import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IRootState } from 'src/app/+store';
import { UserService } from 'src/app/services/user.service';
import { IUser } from '../../model/IUser';
import { Store } from '@ngrx/store'
import { Role } from '../../model/Role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$: Observable<IUser | undefined> = this.store.select(routeState => routeState.currentUser);
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user));
  isAdmin$: Observable<boolean> = this.user$.pipe(map(user => Role.ADMIN == user?.role));
  activeTab: string = '/';


  constructor(private userService: UserService, private router: Router, private store: Store<IRootState>) { }

  ngOnInit(): void {
    this.setInitialActiceTab();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/home');
  }

  setInitialActiceTab(): void {
    let path = location.pathname;
    if (path.toString() === '/home' || path.toString() === ('/')) {
      this.activeTab = 'home';
    } else if (path.toString().startsWith('/game-titles/my-game-titles')) {
      this.activeTab = 'my-game-titles';
    } else if (path.toString() === '/game-titles/new') {
      this.activeTab = 'new-game-title';
    } else if (path.toString().startsWith('/game-titles')) {
      this.activeTab = 'game-titles';
    } else if (path.toString() === '/users') {
      this.activeTab = 'users';
    } else if (path.toString() === '/about') {
      this.activeTab = 'about';
    } else {
      this.activeTab = 'none';
    }
  }

  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }
}
