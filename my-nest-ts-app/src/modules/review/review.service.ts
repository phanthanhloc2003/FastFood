import { Injectable, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductReview } from './entity/product-review.entity';
import { UserService } from '../Users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
import { UpdateReviewDto } from './dto/update-review.dto';


@Injectable()
export class ReviewService {
  constructor(
    @Inject('PRODUCT_REVIEW_REPOSITORY')
    private reviewRepository: Repository<ProductReview>,
 private userService: UserService,
 private productService: ProductService,
 private orderService: OrderService,

  ) {}

  // Hàm cập nhật rating và total_reviews của sản phẩm
  private async updateProductRating(productId: number): Promise<string> {
   try {
    const result = await this.reviewRepository
    .createQueryBuilder('review')
    .select('AVG(review.rating)', 'averageRating')
    .addSelect('COUNT(review.id)', 'totalReviews')
    .where('review.productId = :productId', { productId })
    .getRawOne();

  const averageRating = result.averageRating ? parseFloat(result.averageRating).toFixed(1) : 0;
  const totalReviews = parseInt(result.totalReviews) || 0;
   await this.productService.updateProductRating(productId, averageRating,totalReviews)

   return 'ok'
   } catch (error) {
    console.log('err', error)
    throw error;
   }
  }

  // Thêm đánh giá
  async createReview(
    userId: number,
    productId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<ProductReview> {
    const product  = await this.productService.findOne(productId)
    if (!product) {
     throw new BadRequestException('Product not found');
    }
     const hasPurchased = await this.orderService.hasPurchasedProduct(userId, productId)
   if (!hasPurchased) {
     throw new ForbiddenException('You must purchase this product to review it');
   }
    const existingReview = await this.reviewRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
    if (existingReview) {
      throw new BadRequestException('You have already reviewed this product');
    }
    const review = this.reviewRepository.create({
      user: { id: userId },
      product: { id: productId },
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
    });
    const savedReview = await this.reviewRepository.save(review);
    await this.updateProductRating(productId);
    return savedReview;
  }
  // Sửa đánh giá
  async updateReview(userId: number, reviewId: number, updateReviewDto: UpdateReviewDto): Promise<ProductReview> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['user', 'product'],
    });

    if (!review) {
      throw new BadRequestException('Review not found');
    }

    if (review.user.id !== userId) {
      throw new ForbiddenException('You can only edit your own reviews');
    }

    if (updateReviewDto.rating) review.rating = updateReviewDto.rating;
    if (updateReviewDto.comment !== undefined) review.comment = updateReviewDto.comment;

    const updatedReview = await this.reviewRepository.save(review);
    await this.updateProductRating(review.product.id);

    return updatedReview;
  }

  // Xóa đánh giá
  async deleteReview(userId: number, reviewId: number, userRole: string): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['user', 'product'],
    });

    if (!review) {
      throw new BadRequestException('Review not found');
    }

    if (userRole !== 'Admin' && review.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    await this.reviewRepository.delete(reviewId);

    // Cập nhật rating và total_reviews
    await this.updateProductRating(review.product.id);
  }

  // Lấy danh sách đánh giá của sản phẩm
  async getProductReviews(productId: number): Promise<ProductReview[]> {
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
      select: {
        id: true,
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true,
        user: { id: true, fullName: true },
      },
      order: { created_at: 'DESC' },
    });
  }

  // Lấy chi tiết đánh giá
  async getReviewById(reviewId: number): Promise<ProductReview> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['user', 'product'],
      select: {
        id: true,
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true,
        user: { id: true, fullName: true },
        product: { id: true, name: true },
      },
    });

    if (!review) {
      throw new BadRequestException('Review not found');
    }

    return review;
  }

  // Lấy tất cả đánh giá (admin)
  async getAllReviews(): Promise<ProductReview[]> {
    return this.reviewRepository.find({
      relations: ['user', 'product'],
      select: {
        id: true,
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true,
        user: { id: true, fullName: true },
        product: { id: true, name: true },
      },
      order: { created_at: 'DESC' },
    });
  }
}