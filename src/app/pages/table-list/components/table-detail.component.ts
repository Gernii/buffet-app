import { Component, Input, ViewChild } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '../../dashboard/dashboard.service';
import { Table } from '../../dashboard/type';

@Component({
  selector: 'app-table-detail',
  styles: [
    `
      :host {
        @apply w-full grow;
      }
    `,
  ],
  template: `
    <div
      class="flex-center border-[1px] rounded-md !flex-col px-8 py-6 shadow bg-white border-zinc-200"
    >
      <span class="w-full font-bold uppercase ">
        {{ (table$ | async)?.name }}
      </span>
      <div class="flex-center !justify-end w-full mt-4 gap-2">
        <button nz-button></button>
        <ng-container *ngIf="(table$ | async)?.status">
          <a
            [routerLink]="['/table', (table$ | async)?.id]"
            routerLinkActive="active"
          >
            <button nz-button nzType="primary" nzShape="round">
              <span>Đặt món</span>
            </button>
          </a>
        </ng-container>
      </div>
    </div>
  `,
})
export class TableDetailComponent {
  private tableSubject = new BehaviorSubject<Table | undefined>(undefined);
  @Input() set table(value: Table | undefined) {
    this.tableSubject.next(value);
  }
  table$ = this.tableSubject.asObservable();
  constructor(private dashboardService: DashboardService) {}
  onRemove() {}
}
