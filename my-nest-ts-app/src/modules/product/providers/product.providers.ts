import { Product } from '../entity/product.entity';
import { ProductSize } from '../entity/product-size.entity';
import { ProductImage } from '../entity/product-image.entity';
import { Category } from '../../categories/entity/category.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_SIZE_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(ProductSize),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_IMAGE_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(ProductImage),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
]; 