import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardTableDetailComponent } from './components/table-detail.component';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { EditModalComponent } from './components/edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InputLabelComponent } from './components/input-label.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { PaymentModalComponent } from './components/payment-modal.component';
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
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    DashboardTableDetailComponent,
    EditModalComponent,
    InputLabelComponent,
    PaymentModalComponent,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
