
import { OrderItem } from "../entity/order-item.entity";
import { OrderStatusLog } from "../entity/order-status-log.entity";
import { Order } from "../entity/order.entity";
import { Payment } from "../entity/payment.entity";
import { Table } from "../entity/table.entity";

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: { getRepository: (arg0: typeof Order) => any; }) => dataSource.getRepository(Order),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORDER_ITEM_REPOSITORY',
    useFactory: (dataSource: { getRepository: (arg0: typeof OrderItem) => any; }) => dataSource.getRepository(OrderItem),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PAYMENT_REPOSITORY',
    useFactory: (dataSource: { getRepository: (arg0: typeof Payment) => any; }) => dataSource.getRepository(Payment),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'OEDERSTATUSLOG_REPOSITORY',
    useFactory: (dataSource: { getRepository: (arg0: typeof OrderStatusLog) => any; }) => dataSource.getRepository(OrderStatusLog),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TABLE_REPOSITORY',
    useFactory: (dataSource: { getRepository: (arg0: typeof Table) => any; }) => dataSource.getRepository(Table),
    inject: ['DATA_SOURCE'],
  },
]; 