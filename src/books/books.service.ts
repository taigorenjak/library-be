import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './entity/create-book.dto'; // Popravljeno
import { UpdateBookDto } from './entity/update-book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {}

    // Poišče vse knjige
    async findAll(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    // Poišče eno knjigo glede na ID
    async findOne(id: number): Promise<Book> {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) {
            throw new NotFoundException('Knjiga ne obstaja');
        }
        return book;
    }

    // Ustvari novo knjigo
    async create(createBookDto: CreateBookDto): Promise<Book> {
        const newBook = this.bookRepository.create(createBookDto); // Popravljeno
        return this.bookRepository.save(newBook);
    }

    // Posodobi obstoječo knjigo
    async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) {
            throw new NotFoundException('Knjiga ne obstaja');
        }

        // Posodobi knjigo
        const updatedBook = { ...book, ...updateBookDto };
        await this.bookRepository.save(updatedBook);
        return updatedBook;
    }

    // Briše knjigo
    async delete(id: number): Promise<void> {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) {
            throw new NotFoundException('Knjiga ne obstaja');
        }
        await this.bookRepository.delete(id);
    }
}