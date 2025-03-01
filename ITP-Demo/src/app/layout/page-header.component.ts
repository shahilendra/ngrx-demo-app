import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styles: [
    `
      .feature-header {
        background: white;
        padding: 15px 20px;
        border-bottom: 1px solid #ececec;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        box-shadow: 0 0 4px 2px #ececec;
        position: sticky;
        top: 0;
        z-index: 9999;

        margin-bottom: 20px;
      }

      .title {
        display: flex;
        align-items: center;
        gap: 15px;
        height: 30px;
      }

      .feature-header > .start {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      h1,
      h2,
      p {
        margin-bottom: 0;
      }

      p {
        color: #848484;
      }

      .feature-icon {
        font-size: 35px;
        width: 35px;
        height: auto;
      }
    `
  ]
})
export class PageHeaderComponent {
  @Input() icon?: string;
}
