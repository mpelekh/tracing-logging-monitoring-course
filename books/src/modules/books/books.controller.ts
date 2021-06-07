import {
  Logger,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { RedisClient } from 'redis';

import { REDIS_CONNECTION, REDIS_TOPIC } from '../redis/redis.providers';
import { BookDto, CreateBookInput } from './books.dto';
import { BooksService } from './books.service';
import { JAEGER_CLIENT } from '../jaeger/jaeger.provider';

@Controller('api/v1/books')
export class BooksController {
  constructor(
    private readonly logger: Logger,
    private readonly booksService: BooksService,
    @Inject(REDIS_CONNECTION)
    private readonly redisInstance: RedisClient,
    @Inject(JAEGER_CLIENT)
    private readonly tracer,
  ) {
    this.logger.setContext(BooksController.name);
  }

  @Get('/')
  async getBooks(@Req() req): Promise<BookDto[]> {
    this.logger.log({
      level: 'info',
      message: 'Get books',
      spanId: req.span.context().toSpanId(),
      traceId: req.span.context().toTraceId(),
    });
    console.log('Get books');
    const span = this.tracer.startSpan('get books', {
      childOf: req.span,
    });

    const books = this.booksService.getBooks();

    // Add intentional delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // span.setTag('intentional error', true);
    // span.finish();
    // throw new Error('Boom');

    span.finish();

    return books;
  }

  @Get('/:id')
  getBookById(@Param('id') id: string): BookDto {
    console.log('Get a book by ID');
    return this.booksService.findById(id);
  }

  @Post('/')
  async createBook(
    @Req() req,
    @Body() data: CreateBookInput,
  ): Promise<BookDto> {
    console.log('Create a book');
    const span = this.tracer.startSpan('create book', {
      childOf: req.span,
    });

    const book = await this.booksService.create(data);

    const childSpan = this.tracer.startSpan('send push notification to redis', {
      childOf: span,
    });

    this.sendPushNotification(book, (error, reply) => {
      if (error) {
        childSpan.setTag('error', true);
      } else {
        childSpan.setTag('success', true);
      }

      childSpan.finish();
    });

    span.finish();
    return book;
  }

  private sendPushNotification(
    response: BookDto,
    callback?: (err, reply) => void,
  ): void {
    this.redisInstance.set(REDIS_TOPIC, JSON.stringify(response), callback);
  }
}
