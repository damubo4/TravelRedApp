import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  activeMenu = false;
  activeButton = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu () {
    this.activeMenu = !this.activeMenu;
    this.activeButton = !this.activeButton;
  }

}
