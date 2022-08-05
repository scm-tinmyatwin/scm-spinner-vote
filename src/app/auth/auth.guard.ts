import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService,) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async resolve => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user && !!localStorage.getItem('user_id')) {
          this.authService.hasUserLoggedIn.next(true);
          resolve(true);
        } else {
          this.authService.hasUserLoggedIn.next(false);
          this.router.navigate(['/login'], { queryParams: { 'redirectURL': state.url } });
          resolve(false);
        }
      });
    });
  }
}
