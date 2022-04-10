import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Table } from './type';

@Injectable()
export class DashboardService {
  private tableSubject = new BehaviorSubject<Table[]>([
    {
      id: 1,
      name: 'A-1',
      status: true,
      member: 3,
      listOrder: [],
    },
    {
      id: 2,
      name: 'A-2',
      status: false,
      member: 0,
      listOrder: [],
    },
    {
      id: 3,
      name: 'A-3',
      status: true,
      member: 3,
      listOrder: [],
    },
    {
      id: 4,
      name: 'A-4',
      status: false,
      member: 0,
      listOrder: [],
    },
    {
      id: 5,
      name: 'A-5',
      status: false,
      member: 0,
      listOrder: [],
    },
    {
      id: 6,
      name: 'B-1',
      status: false,
      member: 0,
      listOrder: [],
    },
    {
      id: 7,
      name: 'B-2',
      status: true,
      member: 3,
      listOrder: [],
    },
    {
      id: 8,
      name: 'B-3',
      status: false,
      member: 0,
      listOrder: [],
    },
    {
      id: 9,
      name: 'B-4',
      status: false,
      member: 0,
      listOrder: [],
    },
    {
      id: 10,
      name: 'B-5',
      status: false,
      member: 0,
      listOrder: [],
    },
  ]);
  readonly table$ = this.tableSubject.asObservable();
}
