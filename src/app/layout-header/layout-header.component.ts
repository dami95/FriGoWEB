import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fg-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.sass']
})
export class LayoutHeaderComponent {
  menuOpened: boolean;

  constructor(){
    this.menuOpened = false;
  }

  changeMenuState(){
    this.menuOpened = !this.menuOpened;
  }

}
