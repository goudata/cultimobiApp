export interface Garden {
  isActive: boolean;
  name: string;
  type: string;
  capacity: number;
  notes: string;
  imageURL: string;
  members: object;
  products: object;
  plants: object;
  createdDate: any;
  createdBy: string;
  updatedDate: any;
  updatedBy: string;
}
