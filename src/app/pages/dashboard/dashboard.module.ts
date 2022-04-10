import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableDetailComponent } from './components/table-detail.component';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { EditModalComponent } from './components/edit-modal.component';
@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    NzButtonModule,
    NzPopconfirmModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  exports: [],
  declarations: [DashboardComponent, TableDetailComponent, EditModalComponent],
  providers: [DashboardService],
})
export class DashboardModule {}
