import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entity/review.entity';
import { CreateReviewDto } from './entity/create-review.dto';
import { User } from '../users/entity/user.entity';
import { Book } from '../books/entity/book.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Pridobivanje vseh mnenj
  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({ relations: ['user', 'book'] });
  }

  // Pridobivanje mnenja po ID-ju
  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id }, relations: ['user', 'book'] });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  // Ustvarjanje novega mnenja
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const user = await this.userRepository.findOne({ where: { id: createReviewDto.userId } });
    const book = await this.bookRepository.findOne({ where: { id: createReviewDto.bookId } });

    if (!user || !book) {
      throw new NotFoundException('User or Book not found');
    }

    const review = this.reviewRepository.create({
      content: createReviewDto.content,
      rating: createReviewDto.rating,
      user,
      book,
    });

    return this.reviewRepository.save(review);
  }

  // Posodabljanje mnenja (PATCH namesto PUT)
  async update(id: number, updateReviewDto: Partial<CreateReviewDto>): Promise<Review> {
    const review = await this.findOne(id); // Preverimo, če obstaja
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  // Brisanje mnenja
  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
  }
}