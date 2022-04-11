export interface Table {
  id: number;
  name: string;
  status: boolean;
  members: number;
  list_order: OrderDetail[];
  customer_name: string;
  staf: string;
}

export interface Food {
  id: number;
  name: string;
  price: number;
}

interface OrderDetail {
  id: number;
  number: number;
}

export interface Payment {
  id?: number;
  detail?: { name: string; price: number; number: number }[];
  total?: number;
}
