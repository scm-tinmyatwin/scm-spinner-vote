import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SpinnerWheel';
  userId: any;
  currentUser: any;
  isUserLoggedIn!: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.authService.hasUserLoggedIn$.subscribe((data: boolean) => {
      this.isUserLoggedIn = data;
      if (data && !!this.userId) {
        this.authService.getCurrentUser(this.userId).subscribe((data: string | any[]) => {
          if (data.length > 0) {
            this.currentUser = data[0];
          }
        });
      }
    });
  }

  logout() {
    localStorage.removeItem('user_id');
    this.userId = '';
    this.router.navigate(['/spinner-wheel']);
    this.authService.signOut();
  }
}
