import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter, map, Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { Table } from '../type';

@Component({
  selector: 'app-edit-modal',
  template: `
    <!-- Add User Modal -->
    <!-- <div>{{ (form$ | async)?.invalid }}</div> -->
    <ng-container *ngIf="form$ | async as form">
      <ng-template #content>
        <form [formGroup]="form" class="grid gap-5 w-full ">
          <app-input-label
            formName="Tên khách hàng"
            formControlName="customer_name"
          ></app-input-label>
          <app-input-label
            formName="Số lượng khách"
            formControlName="members"
            inputType="number"
          ></app-input-label>
          <app-input-label
            formName="Nhân viên đặt bàn"
            formControlName="staf"
          ></app-input-label>
        </form>
      </ng-template>
      <ng-template #footer let-ref="modalRef">
        <button nz-button (click)="ref.destroy()" (click)="onClearAddUser()">
          Huỷ
        </button>
        <button
          nz-button
          nzType="primary"
          (click)="onConfirmAddCustomer(form.value)"
          (click)="ref.destroy()"
          [disabled]="form.invalid"
        >
          Xác nhận
        </button>
      </ng-template>
    </ng-container>
  `,
})
export class EditModalComponent {
  form$: Observable<FormGroup>;
  @ViewChild('content', { read: TemplateRef }) content:
    | TemplateRef<Record<string, unknown>>
    | undefined;
  @ViewChild('footer', { read: TemplateRef }) footer:
    | TemplateRef<Record<string, unknown>>
    | undefined;
  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private dashboardService: DashboardService
  ) {
    this.form$ = this.dashboardService.selectedTable$.pipe(
      filter((table): table is Table => !!table),
      map((table) => {
        return this.fb.group({
          id: table.id,
          customer_name: [table.customer_name, Validators.required],
          members: [table.members, Validators.required],
          staf: [table.staf, Validators.required],
        });
      })
    );
  }

  createAddUserModal() {
    this.modal.create({
      nzTitle: 'Edit Table',
      nzContent: this.content,
      nzFooter: this.footer,
      nzOnCancel: () => this.onClearAddUser(),
    });
  }

  onClearAddUser() {}

  onConfirmAddCustomer({
    id,
    customer_name,
    members,
    staf,
  }: {
    id: number;
    customer_name: string;
    members: number;
    staf: string;
  }) {
    this.dashboardService.onChangeTableStatus({
      id,
      customer_name,
      members,
      staf,
    });
  }
}
