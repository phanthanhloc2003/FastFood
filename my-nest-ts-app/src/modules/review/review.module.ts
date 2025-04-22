import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/db/database.module";
import { ProductModule } from "../product/product.module";
import { UsersControllerModule } from "../Users/users.module";
import { OrderModule } from "../order/order.module";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { reviewProviders } from "./providers/review.providers";

@Module({
    imports:[DatabaseModule, ProductModule,UsersControllerModule, OrderModule],
    controllers:[ReviewController],
    providers:[ReviewService,...reviewProviders],
    exports:[ReviewService]
})

export class ReviewModule{}