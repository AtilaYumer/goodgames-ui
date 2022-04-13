import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { UserDto } from '../modules/model/UserDto';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../modules/model/LoginDto';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  register(userDto: UserDto): Observable<void> {
    return this.http.post<void>(`${environment.urlApi}/users`, userDto);
  }

  login(loginDto: LoginDto): Observable<void> {
    return this.http.post<void>(`${environment.urlApi}/users/login`, loginDto, {withCredentials: true, observe: 'response' })
      .pipe(
        tap(response => console.log(response.headers)),
        map(response => {
          const jwtToken: string | null = response.headers.get('Authorization');
          this.authenticationService.storeToken(jwtToken);
        })
        // map(response => {
        //   const jwtToken: string = response.headers.get('Authorization');
        //   this.authenticationService.storeToken(jwtToken);
        // })
      )
  }
}
