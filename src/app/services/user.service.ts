import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { UserDto } from '../modules/model/UserDto';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../modules/model/LoginDto';
import { AuthenticationService } from './authentication.service';
import { IUser } from '../modules/model/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = new BehaviorSubject<IUser>({} as IUser);
  loggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

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
              this.currentUser.next(user);
              this.loggedIn.next(true);
            }));
        })
      )
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get loggedInUser$(): Observable<IUser> {
    return this.currentUser.asObservable();
  }

  getUserInfo$(): Observable<IUser> {
    return this.currentUser.asObservable();
  }

  logout(): void {
    this.authenticationService.clearSession();
    this.currentUser.next({} as IUser);
    this.loggedIn.next(false);
  }
}
