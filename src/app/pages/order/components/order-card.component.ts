import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Food } from '../../dashboard/type';

@Component({
  selector: 'app-order-card',
  template: `
    <li
      class="grid grid-cols-[auto_minmax(auto,100px)_50px] items-center gap-2 p-4"
    >
      <p class="px-4 !mb-0 ">{{ food?.name }}</p>

      <nz-input-number
        [(ngModel)]="number"
        [nzMin]="1"
        [nzMax]="10"
        [nzStep]="1"
      ></nz-input-number>
      <button
        nz-button
        nzType="primary"
        nzShape="circle"
        nz-popconfirm
        nzOkText="OK"
        nzCancelText="Huỷ"
        nzPopconfirmTitle="Xác nhận đặt món này?"
        nzPopconfirmPlacement="bottom"
        (nzOnConfirm)="onOrder()"
      >
        <i nz-icon nzType="check"> </i>
      </button>
    </li>
  `,
})
export class OrderCardComponent {
  @Output() id = new EventEmitter<number>();
  @Input() food: Food | undefined;
  number = 1;

  onOrder() {
    this.id.emit(this.food?.id);
  }
}
