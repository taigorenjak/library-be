import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './entity/create-book.dto'; // Popravljeno
import { UpdateBookDto } from './entity/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    async findAll() {
        return this.booksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.booksService.findOne(+id);
    }

    @Post()
    async create(@Body() createBookDto: CreateBookDto) { // Popravljeno
        return this.booksService.create(createBookDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.booksService.update(+id, updateBookDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.booksService.delete(+id);
    }
}