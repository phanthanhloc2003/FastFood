import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductSize } from './entity/product-size.entity';
import { ProductImage } from './entity/product-image.entity';
import { Category } from '../categories/entity/category.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './providers/product.providers';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ...productProviders],
  exports: [ProductService],
})
export class ProductModule {}
