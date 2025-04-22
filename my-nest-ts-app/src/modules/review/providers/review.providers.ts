import { ProductReview } from "../entity/product-review.entity";

export const reviewProviders = [
  {
    provide: 'PRODUCT_REVIEW_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(ProductReview),
    inject: ['DATA_SOURCE'],
  }
]; 