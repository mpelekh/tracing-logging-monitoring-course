import { Body, Controller, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { RedisClient } from 'redis';

import { AuthorsService } from './authors.service';
import { AuthorDto, CreateAuthorInput } from './authors.dto';
import { REDIS_CONNECTION, REDIS_TOPIC } from '../redis/redis.providers';
import { JAEGER_CLIENT } from '../jaeger/jaeger.provider';

@Controller('api/v1/authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    @Inject(REDIS_CONNECTION)
    private readonly redisInstance: RedisClient,
    @Inject(JAEGER_CLIENT)
    private readonly tracer,
  ) {}

  @Get('/')
  getAuthors(@Req() req): AuthorDto[] {
    console.log('Get authors');
    const span = this.tracer.startSpan('get authors', {
      childOf: req.span,
    });

    const authors = this.authorsService.getAuthors();

    span.finish();

    return authors;
  }

  @Get('/:id')
  getAuthorById(@Param('id') id: string): AuthorDto {
    console.log('Get author by ID');
    return this.authorsService.findById(id);
  }

  @Post('/')
  createAuthor(@Body() data: CreateAuthorInput): AuthorDto {
    console.log('Create author');
    const author = this.authorsService.create(data);
    this.sendPushNotification(author);
    return author;
  }

  private sendPushNotification(response: AuthorDto): void {
    this.redisInstance.set(REDIS_TOPIC, JSON.stringify(response));
  }
}
