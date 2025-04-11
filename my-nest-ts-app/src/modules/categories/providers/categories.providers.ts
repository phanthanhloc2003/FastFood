import { DataSource } from 'typeorm';
import { Category } from '../entity/category.entity';

export const categoriesProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
]; 