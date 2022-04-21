import { Component, Input, ViewChild } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { Table } from '../type';
import { EditModalComponent } from './edit-modal.component';
import { PaymentModalComponent } from './payment-modal.component';

@Component({
  selector: 'app-dashboard-table-detail',
  styles: [
    `
      :host {
        @apply w-full grow;
      }
    `,
  ],
  template: `
    <div
      class="flex-center border-[1px] rounded-md !flex-col px-4 py-6 shadow bg-white border-zinc-200"
    >
      <span class="w-full font-bold uppercase ">
        {{ (table$ | async)?.name }}
      </span>
      <span class="w-full">
        {{ (table$ | async)?.status === false ? 'Bàn trống' : 'Có khách:' }}
        {{ (table$ | async)?.members !== 0 ? (table$ | async)?.members : '' }}
      </span>
      <div class="flex-center !justify-end w-full mt-4 gap-2">
        <ng-container *ngIf="(table$ | async)?.status">
          <button
            nz-button
            nzType="primary"
            nzShape="round"
            nzPopconfirmPlacement="bottom"
            nz-popconfirm
            nzOkText="OK"
            nzCancelText="Huỷ"
            nzPopconfirmTitle="Bạn có muốn xoá bàn này?"
            (nzOnConfirm)="onClearCustomer()"
          >
            <span>Xoá</span>
          </button>
        </ng-container>
        <ng-container *ngIf="table$ | async as table">
          <button
            nz-button
            nzType="primary"
            nzShape="circle"
            (click)="selectTable()"
          >
            <i nz-icon nzType="edit"> </i>
          </button>
        </ng-container>
        <ng-container *ngIf="(table$ | async)?.status === true">
          <button
            nz-button
            nzType="primary"
            nzShape="round"
            (click)="payRequest()"
          >
            <span>Thanh toán</span>
          </button>
        </ng-container>
      </div>
    </div>
    <app-edit-modal></app-edit-modal>
    <app-payment-modal></app-payment-modal>
  `,
})
export class DashboardTableDetailComponent {
  @ViewChild(EditModalComponent) editModal: EditModalComponent | undefined;
  @ViewChild(PaymentModalComponent) paymentModal:
    | PaymentModalComponent
    | undefined;
  private tableSubject = new BehaviorSubject<Table | undefined>(undefined);
  @Input() set table(value: Table | undefined) {
    this.tableSubject.next(value);
  }
  table$ = this.tableSubject.asObservable();
  constructor(private dashboardService: DashboardService) {}
  onRemove() {}
  selectTable() {
    if (this.tableSubject.value === undefined) return;

    this.dashboardService.toggleSelectedTable(this.tableSubject.value);
    setTimeout(() => {
      this.editModal?.createAddUserModal();
    }, 1);
  }
  onClearCustomer() {
    if (this.tableSubject.value === undefined) return;
    this.dashboardService.onClearTableStatus(this.tableSubject.value.id);
  }
  payRequest() {
    if (this.tableSubject.value === undefined) return;
    this.dashboardService.payRequest(this.tableSubject.value.id);
    setTimeout(() => {
      this.paymentModal?.createPaymentModal();
    }, 1);
  }
}
