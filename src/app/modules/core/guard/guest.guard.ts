import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authenticationService.isLoggedIn$.pipe(take(1), map(isLoggedIn => {
        if (!isLoggedIn) {
          return true;
        }
        return this.router.createUrlTree(['/home'], {
          queryParams: {
            'redirect-to': '/' + route.url.map(f => f.path).join('/')
          }
        });
      }))
  }

}
