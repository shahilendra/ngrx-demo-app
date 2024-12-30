import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output
  } from '@angular/core';
  
  @Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [
      `
        .spacer {
          flex: 1 1 auto;
        }
  
        .title {
          cursor: pointer;
        }
  
        .welcome-text {
          font-size: smaller;
        }
      `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class HeaderComponent {
    @Output() menuToggled = new EventEmitter<boolean>();
  
    user: string = 'Shailendra Tiwari';
  
    // constructor(private authService: AuthService) { }
  
    logout(): void {
      console.log('Logged out');
    }
  }
  