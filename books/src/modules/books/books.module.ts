import { Module } from '@nestjs/common';

import { ApiModule } from '../api/api.module';
import { RedisModule } from '../redis/redis.module';
import { JaegerModule } from '../jaeger/jaeger.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [ApiModule, RedisModule, JaegerModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
