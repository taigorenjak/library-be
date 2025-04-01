import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entity/book.entity';
import { User } from './users/entity/user.entity';
import { BooksModule } from './books/books.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'library',
      entities: [Book, User],  // Popravi sem z uporabo pravilnega tipa
      synchronize: true,
    }),
    BooksModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}