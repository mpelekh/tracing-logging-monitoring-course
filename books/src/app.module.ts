import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';

import { BooksModule } from './modules/books/books.module';
import { RedisModule } from './modules/redis/redis.module';


@Module({
  imports: [
    ApiModule,
    RedisModule,
    BooksModule,
  ],
})
export class AppModule {}
