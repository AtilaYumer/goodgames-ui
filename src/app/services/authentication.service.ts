import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from '@ngrx/store';
import { IRootState } from '../+store';
import { IUser } from '../modules/model/IUser';
import { environment } from 'src/environments/environment';
import { login } from '../+store/action';
import { map, Observable, of, tap } from 'rxjs';

const helper = new JwtHelperService();
const TOKEN_STORAGE_KEY = "auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$: Observable<IUser | undefined> = this.store.select(globalState => globalState.currentUser);

  constructor(private http: HttpClient, private router: Router, private store: Store<IRootState>) { }

  clearSession(): void {
    localStorage.clear();
  }

  storeToken(token: string | null) {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  authenticate(): Observable<IUser | undefined> {
    let token = this.getToken();
    if (token) {
      const isExpired = helper.isTokenExpired(token);
      if (!isExpired) {
        return this.http.get<IUser>(`${environment.urlApi}/users/info`, { withCredentials: true })
          .pipe(tap(user => {
            this.store.dispatch(login({ user }));
          }));
      } else {
        localStorage.clear();
        this.router.navigateByUrl('/login');
        return of(undefined);
      }
    } else {
      localStorage.clear();
      this.router.navigateByUrl('/login');
      return of(undefined);
    }
  }
}
