import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { addressProviders } from "./providers/address.provider";
import { DatabaseModule } from "src/db/database.module";
import { UsersControllerModule } from "../Users/users.module";
import { AddressController } from "./address.controller";


@Module({
    imports:[DatabaseModule, UsersControllerModule],
    controllers:[AddressController],
    providers:[AddressService,...addressProviders],
    exports:[AddressService]
})

export class AddressModule{};