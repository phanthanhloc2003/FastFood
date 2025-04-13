import { CartItem } from "../entity/cart-item.entity";
import { Cart } from "../entity/cart.entity";

export const cartProviders = [
  {
    provide: 'CART_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(Cart),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CART_ITEM_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(CartItem),
    inject: ['DATA_SOURCE'],
  }
]; 