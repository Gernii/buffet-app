import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
@Component({
  templateUrl: 'dashboard.component.html',
  styles: [
    `
      :host {
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100vw;
        height: 100vh;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .app-layout {
        height: 100vh;
      }

      nz-content {
        overflow-y: auto;
      }
    `,
  ],
})
export class DashboardComponent {
  table$ = this.dashboardService.table$;
  constructor(private dashboardService: DashboardService) {}
}
