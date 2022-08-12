import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { UserDto } from '../modules/model/UserDto';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../modules/model/LoginDto';
import { AuthenticationService } from './authentication.service';
import { IUser } from '../modules/model/IUser';
import { Store } from '@ngrx/store';
import { IRootState } from '../+store';
import { login, logout } from '../+store/action';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$: Observable<IUser | undefined> = this.store.select(globalState => globalState.currentUser);
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private store: Store<IRootState>) { }

  getUsers$() : Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.urlApi}/users`, { withCredentials: true});
  }

  register$(userDto: UserDto): Observable<void> {
    return this.http.post<void>(`${environment.urlApi}/users`, userDto);
  }

  login$(loginDto: LoginDto): Observable<void> {
    return this.http.post<void>(`${environment.urlApi}/users/login`, loginDto, { observe: 'response' })
      .pipe(
        tap(response => console.log(response.headers)),
        map(response => {
          const jwtToken: string | null = response.headers.get('Authorization');
          this.authenticationService.storeToken(jwtToken);
        }),
        switchMap(() => {
          return this.http.get<IUser>(`${environment.urlApi}/users/info`, { withCredentials: true })
            .pipe(map(user => {
              this.store.dispatch(login({user}));
            }));
        })
      )
  }

  logout(): void {
    this.authenticationService.clearSession();
    this.store.dispatch(logout());
  }

  updateUserRole$(user: UserDto): Observable<void> {
    return this.http.put<void>(`${environment.urlApi}/users/${user.id}/role`, user, { withCredentials: true});
  }
}
