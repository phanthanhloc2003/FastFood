import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProductReview } from './entity/product-review.entity';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { User } from 'src/common/decorators/public-router.decorator';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // Thêm đánh giá
  @Post('products/:productId/reviews')
  async createReview(
    @User() user: IUserNoPassWord,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ProductReview> {
    const userId = user.id;
    return this.reviewService.createReview(userId, productId, createReviewDto);
  }

  // Sửa đánh giá
  @Patch('reviews/:id')
  async updateReview(
    @Req() req,
    @Param('id', ParseIntPipe) reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ProductReview> {
    const userId = req.user.id;
    return this.reviewService.updateReview(userId, reviewId, updateReviewDto);
  }

  // Xóa đánh giá

  @Delete('reviews/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  async deleteReview(
    @User() user:IUserNoPassWord,
    @Param('id', ParseIntPipe) reviewId: number,
  ): Promise<void> {
    const userId = user.id;
    const userRole = user.role
    if(userRole){
        return this.reviewService.deleteReview(userId,reviewId, userRole);
    }
  }

  @Get('products/:productId/reviews')
  async getProductReviews(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductReview[]> {
    return this.reviewService.getProductReviews(productId);
  }

  //   // Lấy chi tiết đánh giá
  @Get('reviews/:id')
  async getReviewById(
    @Param('id', ParseIntPipe) reviewId: number,
  ): Promise<ProductReview> {
    return this.reviewService.getReviewById(reviewId);
  }

  // Lấy tất cả đánh giá (admin)
  @Get('admin/reviews')
  async getAllReviews(): Promise<ProductReview[]> {
    return this.reviewService.getAllReviews();
  }

  // Xóa đánh giá (admin)
  @Delete('admin/reviews/:id')
  async deleteAdminReview(
    @User() user:IUserNoPassWord,
    @Param('id', ParseIntPipe) reviewId: number,
  ): Promise<void> {
    const userId = user.id;
    const userRole = user.role
    if(userRole){
        return this.reviewService.deleteReview(userId,reviewId,userRole);
    }
  
  }
}
