import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard/dashboard.service';
@Component({
  templateUrl: 'table-list.component.html',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableListComponent {
  sub: Subscription | undefined;
  table$ = this.dashboardService.table$;
  constructor(private dashboardService: DashboardService) {
    this.sub = this.table$.subscribe((value) => console.log(value));
  }
}
