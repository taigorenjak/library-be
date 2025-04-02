import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entity/review.entity';
import { User } from '../users/entity/user.entity';
import { Book } from '../books/entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Book])], // Poveži User in Book entitete z ReviewsModule
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}