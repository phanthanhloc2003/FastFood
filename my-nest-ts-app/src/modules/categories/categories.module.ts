import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { DatabaseModule } from 'src/db/database.module';
import { categoriesProviders } from './providers/categories.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [...categoriesProviders, CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
