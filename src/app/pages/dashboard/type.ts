export interface Table {
  id: number;
  name: string;
  status: boolean;
  member: number;
  listOrder: Food[];
}

export interface Food {
  id: number;
  name: string;
  price: number;
}
