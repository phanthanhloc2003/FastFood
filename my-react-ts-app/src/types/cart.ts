import { IResProductSize} from "./product";

export interface IAddCart {
  productSizeId: number;
  quantity: number;
}

export interface CartItemResponse {
  id: number;
  productSize:IResProductSize;
  quantity: number;
  addedAt: string;
}
