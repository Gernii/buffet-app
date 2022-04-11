import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableListComponent } from './table-list.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzListModule } from 'ng-zorro-antd/list';
import { DashboardService } from '../dashboard/dashboard.service';
import { TableDetailComponent } from './components/table-detail.component';

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
        component: TableListComponent,
      },
    ]),
  ],
  exports: [],
  declarations: [TableListComponent, TableDetailComponent],
  providers: [DashboardService],
})
export class TableListModule {}
