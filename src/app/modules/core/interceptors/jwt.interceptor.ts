import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import * as e from 'express';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();
    if (token && !(request.url.match(/users/) && !request.url.match(/users\/info/)) && !(request.method === "GET" && request.url.match(/^.*\/game-titles[\/]{0,1}$/g))) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })
    }
    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authenticationService.clearSession();
            this.router.navigateByUrl('/login');
          } else if (err.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          return;
        }
      }));
  }
}
