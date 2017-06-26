import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class NotLoggedInGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const loggedin = this.userService.isLoggedIn();
    if(loggedin)
      this.router.navigate(['/fridge']);
    return loggedin;
  }
}
