import { Injectable, Inject, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entity/category.entity';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
        throw new ConflictException('Tên danh mục đã tồn tại');
      }
      throw new BadRequestException('Có lỗi xảy ra khi tạo danh mục');
    }
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Không tìm thấy danh mục với ID ${id}`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = await this.findOne(id);
      Object.assign(category, updateCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
        throw new ConflictException('Tên danh mục đã tồn tại');
      }
      throw new BadRequestException('Có lỗi xảy ra khi cập nhật danh mục');
    }
  }
  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
