import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductSize } from './entity/product-size.entity';
import { ProductImage } from './entity/product-image.entity';
import { Category } from '../categories/entity/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('PRODUCT_SIZE_REPOSITORY')
    private productSizeRepository: Repository<ProductSize>,
    @Inject('PRODUCT_IMAGE_REPOSITORY')
    private productImageRepository: Repository<ProductImage>,
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, sizes, images, ...productData } = createProductDto;

    const product = await this.productRepository.create(productData);

    if (categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.categoryId = category;
    }

    const savedProduct = await this.productRepository.save(product);

    // Save sizes
    const productSizes = sizes.map(size => ({
      ...size,
      product: savedProduct,
    }));
    await this.productSizeRepository.save(productSizes);

    // Save images
    const productImages = images.map(url => ({
      url,
      product: savedProduct,
    }));
    await this.productImageRepository.save(productImages);

    return this.findOne(savedProduct.id);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['categoryId', 'sizes', 'images'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categoryId', 'sizes', 'images'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    const { categoryId, sizes, images, ...productData } = updateProductDto;

    if (categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.categoryId = category;
    }

    Object.assign(product, productData);

    // Update sizes
    if (sizes) {
      await this.productSizeRepository.delete({ product: { id } });
      const productSizes = sizes.map(size => ({
        ...size,
        product,
      }));
      await this.productSizeRepository.save(productSizes);
    }

    // Update images
    if (images) {
      await this.productImageRepository.delete({ product: { id } });
      const productImages = images.map(url => ({
        url,
        product,
      }));
      await this.productImageRepository.save(productImages);
    }

    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { categoryId: { id: categoryId } },
      relations: ['category', 'sizes', 'images'],
    });
  }

  async searchByName(name: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) LIKE LOWER(:name)', { name: `%${name}%` })
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.images', 'images')
      .getMany();
  }
}
