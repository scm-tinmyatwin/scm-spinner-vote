import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './stars-voting-login.component.html',
  styleUrls: ['./stars-voting-login.component.scss']
})
export class LoginComponent implements OnInit {
  voteFormControl = new FormControl();

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
  });

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.Login();
  }
}
