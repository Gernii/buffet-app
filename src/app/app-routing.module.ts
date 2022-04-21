import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'table',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/table-list/table-list.module').then(
            (m) => m.TableListModule
          ),
      },
      {
        path: ':id',
        loadChildren: () =>
          import('./pages/order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
  { path: '', pathMatch: 'prefix', redirectTo: 'table' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
