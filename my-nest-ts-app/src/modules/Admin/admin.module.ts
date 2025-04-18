import { Module } from "@nestjs/common";
import { OrderModule } from "../order/order.module";
import { OrderController } from "./admin.controller";

@Module({
    imports:[OrderModule],
    controllers:[OrderController]
})
export class AdminModule{}