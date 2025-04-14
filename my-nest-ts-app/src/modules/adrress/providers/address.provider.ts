
import { Address } from '../entity/address.entity';

export const addressProviders = [
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(Address),
    inject: ['DATA_SOURCE'],
  }
]; 