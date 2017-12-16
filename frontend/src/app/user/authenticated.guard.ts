import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.authService.getAuthenticatedState()
        .then(isAuthenticated => {
          
          if (!isAuthenticated) {
            this.router.navigate(['/user/login']);
          }

          return true;
        });
    }
}
