import { Body, Controller, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { RedisClient } from 'redis';

import { REDIS_CONNECTION, REDIS_TOPIC } from '../redis/redis.providers';
import { BookDto, CreateBookInput } from './books.dto';
import { BooksService } from './books.service';
import { JAEGER_CLIENT } from '../jaeger/jaeger.provider';

@Controller('api/v1/books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    @Inject(REDIS_CONNECTION)
    private readonly redisInstance: RedisClient,
    @Inject(JAEGER_CLIENT)
    private readonly tracer,
  ) {}

  @Get('/')
  getBooks(@Req() req): BookDto[] {
    console.log('Get books');
    const span = this.tracer.startSpan('get books', {
      childOf: req.span,
    });

    const books = this.booksService.getBooks();

    span.finish();

    return books;
  }

  @Get('/:id')
  getBookById(@Param('id') id: string): BookDto {
    console.log('Get a book by ID');
    return this.booksService.findById(id);
  }

  @Post('/')
  async createBook(@Body() data: CreateBookInput): Promise<BookDto> {
    console.log('Create a book');
    const book = await this.booksService.create(data);
    this.sendPushNotification(book);
    return book;
  }

  private sendPushNotification(response: BookDto): void {
    this.redisInstance.set(REDIS_TOPIC, JSON.stringify(response));
  }
}
