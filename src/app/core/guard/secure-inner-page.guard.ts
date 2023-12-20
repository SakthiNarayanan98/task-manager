import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SecureInnerPageGuard implements CanActivate {
  constructor(private authService: AuthenticationService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Check the user is logged in or not(In case the user is not logged in he will be redirected to Signin page)
    // if(this.authService.isLoggedIn !== true) {
    //   this.router.navigate(['sign-up'])
    // }
    return true;
  }
} 