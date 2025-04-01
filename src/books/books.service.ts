import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './entity/create-book.dto';
import { UpdateBookDto } from './entity/update-book.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  // Create a new book
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.booksRepository.create(createBookDto);
    return await this.booksRepository.save(newBook);
  }

  // Find all books
  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  // Find a book by its ID
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  // Update a book by its ID
  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(book, updateBookDto); // Apply changes to the found book
    return await this.booksRepository.save(book); // Save the updated book
  }

  // Remove a book by its ID
  async remove(id: number): Promise<void> {
    const book = await this.booksRepository.findOne({ where: { id } });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    await this.booksRepository.remove(book); // Remove the book from the repository
  }
}