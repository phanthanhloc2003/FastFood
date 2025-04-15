import { Address } from "./address";
import { IResProductSize} from "./product";

export interface IAddCart {
  productSizeId: number;
  quantity: number;
}

export interface CartItemResponse {
  id?:string;
  productSize: IResProductSize;
  quantity: number;
  size: string;
  price:number;
}

export interface Table {
  id: number;
  table_number: string;
  capacity: number;
}

export interface CheckoutResponse {
  cart: CartItemResponse[];
  totalPrice: number;
  address: Address[] | null;
  table: Table | null;
}