import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(book);
  }

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.getAllBooks(query);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteBook(id);
  }
}
