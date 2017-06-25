import { Component } from '@angular/core';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'fg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  menuOpened: boolean;

  constructor(private userService: UserService) {
    this.menuOpened = false;
  }

  changeMenuState(){
    this.menuOpened = !this.menuOpened;
  }

  get isLoggedIn() {
    return this.userService.isLoggedIn();
  }
}
