import { Component, Input } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Table } from '../type';

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
      <span class="w-full">
        {{ (table$ | async)?.status === false ? 'Bàn trống' : 'Có khách:' }}
        {{ (table$ | async)?.member !== 0 ? (table$ | async)?.member : '' }}
      </span>
      <div class="flex-center !justify-end w-full mt-4 gap-2">
        <ng-container *ngIf="(table$ | async)?.status">
          <button
            nz-button
            nzType="primary"
            nzShape="round"
            nz-popconfirm
            nzOkText="OK"
            nzCancelText="Huỷ"
            nzPopconfirmTitle="Bạn có muốn xoá bàn này?"
            (nzOnConfirm)="onRemove()"
          >
            <span>Xoá</span>
          </button>
        </ng-container>
        <button
          nz-button
          nzType="primary"
          nzShape="circle"
          (click)="onRemove()"
        >
          <i nz-icon nzType="edit" nzTheme="outline"> </i>
        </button>
        <ng-container *ngIf="(table$ | async)?.status === true">
          <button
            nz-button
            nzType="primary"
            nzShape="round"
            nz-popconfirm
            nzOkText="OK"
            nzCancelText="Huỷ"
            nzPopconfirmTitle="Bạn có muốn thanh toán bàn này?"
            (nzOnConfirm)="onRemove()"
          >
            <span>Thanh toán</span>
          </button>
        </ng-container>
      </div>
    </div>
  `,
})
export class TableDetailComponent {
  // TODO: overuse BehaviourSubject, need to fix this
  private tableSubject = new BehaviorSubject<Table | undefined>(undefined);
  @Input() set table(value: Table | undefined) {
    this.tableSubject.next(value);
  }
  table$ = this.tableSubject.asObservable();
  onRemove() {}
}
