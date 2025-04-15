import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { AddressModule } from "../adrress/address.module";
import { DatabaseModule } from "src/db/database.module";
import { orderProviders } from "./providers/orderProviders";
import { CartModule } from "../cart/cart.module";
import { UsersControllerModule } from "../Users/users.module";
import { NotificationModule } from "../notification/notification.module";
@Module({
  imports: [DatabaseModule, AddressModule,CartModule,UsersControllerModule,NotificationModule],
  controllers: [OrderController],
  providers: [OrderService , ...orderProviders],
  exports: [OrderService],
})
export class OrderModule {}
