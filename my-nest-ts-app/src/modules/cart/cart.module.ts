import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { cartProviders } from './providers/categories.providers';
import { ProductModule } from '../product/product.module';
import { UsersControllerModule } from '../Users/users.module';

@Module({
  imports: [DatabaseModule,ProductModule,UsersControllerModule],
  controllers: [CartController],
  providers: [CartService, ...cartProviders],
  exports: [CartService],
})
export class CartModule {}
