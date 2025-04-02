import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entity/user.entity';
import { Book } from './books/entity/book.entity';
import { Review } from './reviews/entity/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Popravljeno iz 'PostgreSQL'
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'library',
      entities: [User, Book, Review],
      synchronize: true,
    }),
    UsersModule,
    BooksModule,
    ReviewsModule,
    AuthModule,
  ],
})
export class AppModule {}