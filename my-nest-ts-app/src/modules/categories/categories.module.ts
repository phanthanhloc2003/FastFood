import { Module } from "@nestjs/common";
import { CategoriesControllers } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
     controllers:[CategoriesControllers],
     providers:[CategoriesService],
     exports:[CategoriesService]
})
export class CategoriesControllerModule {}
