import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Asset Management A',  icon: 'dashboard', class: '' },
  { path: '/dashboard-b', title: 'Asset Management B',  icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  { path: '/table-list-a', title: 'Outgoing Settlements A',  icon:'content_paste', class: '' },
  { path: '/table-list-b', title: 'Outgoing Settlements B',  icon:'content_paste', class: '' },
  { path: '/trade-settle', title: 'Trade Settlement',  icon:'query_builder', class: '' }
//    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit, AfterViewChecked {
  menuItems!: any[];
  routerPath: string = '';

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  ngAfterViewChecked() {
    this.routerPath = window.location.href.split('#')[1];
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
