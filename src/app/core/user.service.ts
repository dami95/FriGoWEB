import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { LoginModel } from '../shared/models/account/login.model';
import { LoggedInResponse } from '../shared/models/account/logged-in.response';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  authHeaders = new Headers();
  private _user: string;

  constructor(
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if(token)
      this.setAuthToken(token);
  }

  onLoggedIn(loggedInResponse: LoggedInResponse) {
    this.setAuthToken(loggedInResponse.access_token);
    this.user = loggedInResponse.userName;
  }

  setAuthToken(token: string) {
    this.authHeaders.set('Authorization', 'Bearer ' + token);
    localStorage.setItem('token', token);
  }

  set user(userName: string) {
    if(!userName)
      localStorage.removeItem('userName');
    else
      localStorage.setItem('userName', userName);
    this._user = userName;
  }

  get user(): string {
    if(!this._user)
      this._user = localStorage.getItem('userName');
    return this._user;
  }

  logout() {
    this.authHeaders = new Headers();
    localStorage.removeItem('token');
    this.user = null;
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  unauthorized() {
    this.logout();
    this.router.navigate(['/account/login']);
  }
}
