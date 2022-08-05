import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class VotingGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const id = route.paramMap.get('id') || ""
    return new Promise(async resolve => {
      const userId = localStorage.getItem('user_id')
      this.apiService.getStarVotingListByid(id).pipe(take(1))
        .subscribe(data => {
          if (data) {
            const endVoting = data[0]?.endVoting
            const hasfingerId = data[0]?.votedUser.find((obj: any) => obj == userId);
            if (endVoting || !!hasfingerId) {
              this.router.navigate(['/voting-result', id]);
              resolve(false);
            }
            else {
              resolve(true);
            }
          }
        });
    });
  }
}
