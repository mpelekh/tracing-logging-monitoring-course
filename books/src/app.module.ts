import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';

import { BooksModule } from './modules/books/books.module';
import { RedisModule } from './modules/redis/redis.module';
import { JaegerModule } from './modules/jaeger/jaeger.module';
import { JaegerMiddleware } from './jaeger.middleware';

@Module({
  imports: [ApiModule, RedisModule, BooksModule, JaegerModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JaegerMiddleware).forRoutes('/');
  }
}
