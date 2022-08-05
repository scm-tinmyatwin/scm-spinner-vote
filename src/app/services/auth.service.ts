import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable()
export class AuthService {
  loggedIn = new BehaviorSubject<any>('');
  loggedIn$ = this.loggedIn.asObservable();

  hasUserLoggedIn = new BehaviorSubject<boolean>(false);
  hasUserLoggedIn$ = this.hasUserLoggedIn.asObservable();
  redirectURL = "";

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.hasUserLoggedIn.next(true);
      } else {
        this.hasUserLoggedIn.next(false);
      }
    });
  }

  getCurrentUser(id: string): Observable<any> {
    return this.apiService.getUserById(id);
  }

  Login(): any {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (result: any) => {
        const user = result.user || ''
        this.loggedIn.next(user);
        localStorage.setItem('user_id', user.uid)
        let params = this.route.snapshot.queryParams;
        if (params['redirectURL']) {
          this.redirectURL = params['redirectURL'];
        }
        if (this.redirectURL) {
          this.router.navigateByUrl(this.redirectURL,)
            .catch(() => this.router.navigate(['/voting-list']))
        } else {
          this.router.navigate(['/voting-list'])
        }
      })
      .catch((error: any) => console.log(error));
  }

  signOut(): void {
    this.afAuth.signOut();
  }
}