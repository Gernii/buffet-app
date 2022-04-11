import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter, map, Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { Table } from '../type';

@Component({
  selector: 'app-payment-modal',
  template: `
    <ng-template #content>
      <ng-container *ngIf="paymentReview$ | async as paymentReview">
        <div
          class="grid grid-cols-[auto_minmax(auto,50px)_minmax(auto,100px)_minmax(auto,100px)] items-center gap-2"
        >
          <span class="font-semibold capitalize"> Tên </span>
          <span class="font-semibold capitalize text-center whitespace-nowrap">
            Số lượng
          </span>
          <span class="font-semibold capitalize text-right"> Giá </span>
          <span class="font-semibold capitalize text-right"> Tổng </span>
        </div>
        <nz-list>
          <nz-list-item *ngFor="let item of paymentReview.detail">
            <nz-list-item-meta-title>
              {{ item.name }}
            </nz-list-item-meta-title>
            <ul
              class="grid-cols-[minmax(auto,50px)_minmax(auto,100px)_minmax(auto,100px)] grid"
            >
              <li class="text-center">{{ item.number }}</li>
              <li class="text-right">{{ item.price }}</li>
              <li class="text-right">{{ item.price * item.number }}</li>
            </ul>
          </nz-list-item>
        </nz-list>
        <div class="w-full text-right">
          <span class="font-bold text-lg">Tổng: {{ paymentReview.total }}</span>
        </div>
      </ng-container>
    </ng-template>
    <ng-template #footer let-ref="modalRef">
      <button nz-button (click)="ref.destroy()">Huỷ</button>
      <ng-container *ngIf="(paymentReview$ | async)?.id as id">
        <button
          nz-button
          nzType="primary"
          nz-popconfirm
          nzOkText="OK"
          nzCancelText="Huỷ"
          nzPopconfirmTitle="Xác nhận thanh toán?"
          (nzOnConfirm)="onClearCustomer(id)"
          (nzOnConfirm)="ref.destroy()"
        >
          Xác nhận
        </button>
      </ng-container>
    </ng-template>
  `,
})
export class PaymentModalComponent {
  paymentReview$ = this.dashboardService.paymentReview$;
  @ViewChild('content', { read: TemplateRef }) content:
    | TemplateRef<Record<string, unknown>>
    | undefined;
  @ViewChild('footer', { read: TemplateRef }) footer:
    | TemplateRef<Record<string, unknown>>
    | undefined;
  constructor(
    private modal: NzModalService,
    private dashboardService: DashboardService
  ) {}

  createPaymentModal() {
    this.modal.create({
      nzTitle: 'Add user',
      nzContent: this.content,
      nzFooter: this.footer,
      nzOnCancel: () => this.onClearPayment(),
    });
  }

  onClearPayment() {}
  onClearCustomer(id: number) {
    this.dashboardService.onClearTableStatus(id);
  }
  onConfirmPayment(id: number) {
    this.onClearCustomer(id);
  }
}
