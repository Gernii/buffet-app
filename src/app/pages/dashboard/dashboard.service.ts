import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  first,
  map,
  Subscription,
  switchMap,
} from 'rxjs';
import { Food, Payment, Table } from './type';

@Injectable()
export class DashboardService {
  sub: Subscription;
  private tableSubject = new BehaviorSubject<Table[]>([
    {
      id: 1,
      name: 'A-1',
      status: true,
      members: 3,
      list_order: [
        { id: 15, number: 1 },
        { id: 10, number: 3 },
      ],
      staf: 'Lee',
      customer_name: 'Gernii',
    },
    {
      id: 2,
      name: 'A-2',
      status: false,
      members: 0,
      list_order: [],
      staf: '',
      customer_name: '',
    },
    {
      id: 3,
      name: 'A-3',
      status: true,
      members: 3,
      list_order: [
        { id: 1, number: 3 },
        { id: 2, number: 3 },
        { id: 101, number: 1 },
      ],
      staf: 'AB',
      customer_name: 'Lê Anh',
    },
    {
      id: 4,
      name: 'A-4',
      status: false,
      members: 0,
      list_order: [],
      staf: '',
      customer_name: '',
    },
    {
      id: 5,
      name: 'A-5',
      status: false,
      members: 0,
      list_order: [],
      staf: '',
      customer_name: '',
    },
    {
      id: 6,
      name: 'B-1',
      status: false,
      members: 0,
      list_order: [],
      staf: '',
      customer_name: '',
    },
    {
      id: 7,
      name: 'B-2',
      status: true,
      members: 3,
      list_order: [
        { id: 1, number: 3 },
        { id: 2, number: 3 },
        { id: 103, number: 3 },
      ],
      staf: 'AB',
      customer_name: 'Cola',
    },
    {
      id: 8,
      name: 'B-3',
      status: false,
      members: 0,
      list_order: [],
      staf: '',
      customer_name: '',
    },
    {
      id: 9,
      name: 'B-4',
      status: false,
      members: 0,
      list_order: [],
      staf: '',
      customer_name: '',
    },
    {
      id: 10,
      name: 'B-5',
      status: false,
      members: 0,
      list_order: [],
      staf: '',
      customer_name: '',
    },
  ]);
  foods: Food[] = [
    { id: 1, name: 'Cá Basa', price: 0 },
    { id: 2, name: 'Sườn bò', price: 0 },
    { id: 15, name: 'Cá hồi', price: 0 },
    { id: 10, name: 'Sườn heo', price: 0 },
    { id: 101, name: 'Rượu vang', price: 10000000 },
    { id: 103, name: 'Rượu Soju', price: 100000 },
  ];
  private paymentReviewObject = new BehaviorSubject<Payment | undefined>(
    undefined
  );
  readonly paymentReview$ = this.paymentReviewObject.asObservable();
  readonly table$ = this.tableSubject.asObservable();

  private selectedTableSubject = new BehaviorSubject<Table | undefined>(
    undefined
  );
  readonly selectedTable$ = this.selectedTableSubject.asObservable();

  constructor() {
    this.sub = this.selectedTable$.subscribe((value) => console.log(value));
  }

  toggleSelectedTable(value: Table) {
    this.selectedTableSubject.next(value);
  }

  clearSelectedTable() {
    this.selectedTableSubject.next(undefined);
  }

  onChangeTableStatus({
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
    let tables = this.tableSubject.value;
    tables.forEach((table) => {
      if (table.id === id) {
        table.customer_name = customer_name;
        table.members = members;
        table.staf = staf;
        table.status = true;
      }
    });
    this.tableSubject.next(tables);
  }
  onClearTableStatus(id: number) {
    const tables = this.tableSubject.value;
    tables.forEach((table) => {
      if (table.id === id) {
        table.customer_name = '';
        table.members = 0;
        table.staf = '';
        table.status = false;
      }
    });
    this.tableSubject.next(tables);
  }
  payRequest(tableId: number) {
    this.paymentReviewObject.next({ id: tableId, detail: [] });
    let price = 0;
    const tables = this.tableSubject.value;
    const table = tables.filter((table) => table.id === tableId)[0];
    table.list_order.forEach((foodOrdered) => {
      const food = this.foods.filter((food) => food.id === foodOrdered.id)[0];
      price += food.price * foodOrdered.number;

      this.paymentReviewObject.next({
        ...this.paymentReviewObject.value,
        detail: this.paymentReviewObject.value?.detail?.concat({
          name: food.name,
          number: foodOrdered.number,
          price: food.price,
        }),
      });
    });

    this.paymentReviewObject.next({
      ...this.paymentReviewObject.value,
      detail: this.paymentReviewObject.value?.detail?.concat({
        name: 'Khách hàng',
        number: table.members,
        price: 300000,
      }),
    });

    price += table.members * 300000;
    this.paymentReviewObject.next({
      ...this.paymentReviewObject.value,
      total: price,
    });
    console.log(price);
    console.log(this.paymentReviewObject.value);
  }
  toggleTableOrder(tableId: number, foodId: number, number: number) {
    const tables = this.tableSubject.value;
    tables.forEach((table) => {
      if (table.id === tableId) {
        table.list_order = [
          ...table.list_order,
          { id: foodId, number: number },
        ];
      }
    });
    this.tableSubject.next(tables);
  }
}
