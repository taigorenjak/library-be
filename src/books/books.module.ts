import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entity/book.entity'; // Knjiga entiteta

@Module({
    imports: [TypeOrmModule.forFeature([Book])], // Omogoči uporabo Book entitete v tem modulu
    controllers: [BooksController],  // Registriraj kontroler za knjige
    providers: [BooksService],  // Dodaj servis za knjige
})
export class BooksModule {}