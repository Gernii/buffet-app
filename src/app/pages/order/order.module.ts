import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { DashboardService } from '../dashboard/dashboard.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ListOrderComponent } from './components/list-order.component';
import { OrderCardComponent } from './components/order-card.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzListModule,
    ScrollingModule,
    NzInputNumberModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderComponent,
      },
    ]),
  ],
  exports: [],
  declarations: [OrderComponent, ListOrderComponent, OrderCardComponent],
  providers: [DashboardService],
})
export class OrderModule {}
