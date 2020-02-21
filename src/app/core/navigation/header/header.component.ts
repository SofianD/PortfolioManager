import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  showNav() {
    this.isOpen === true ? this.closeNav() : this.openNav();
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '230px';
    setTimeout(() => { this.isOpen = true; }, 250);
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    this.isOpen = false;
  }

}
