import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Menu } from './menu.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home',
      color: '#ff7f0e',
    },
    {
      title: 'Statistics',
      icon: 'bar_chart',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Sales',
          icon: 'money',
          link: '/sales',
          color: '#ff7f0e',
        },
        {
          title: 'Customers',
          icon: 'people',
          color: '#ff7f0e',
          link: '/customers',
          subMenu: [
            {
              title: 'Sales',
              icon: 'money',
              link: '/sales',
              color: '#ff7f0e',
            },
            {
              title: 'Customers',
              icon: 'people',
              color: '#ff7f0e',
              link: '/customers',
            },
          ]
        },
      ],
    },
    {
      title: 'Orgnization',
      icon: 'bar_chart',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Employees',
          icon: 'money',
          link: '/employees',
          color: '#ff7f0e',
        },
        {
          title: 'Add Employees',
          icon: 'money',
          link: '/add-employees',
          color: '#ff7f0e',
        },
        {
          title: 'Departments',
          icon: 'people',
          color: '#ff7f0e',
          link: '/departments',
        },
      ],
    },
  ];
}
