import { Module, MiddlewareConsumer, Logger } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';

import { BooksModule } from './modules/books/books.module';
import { RedisModule } from './modules/redis/redis.module';
import { JaegerModule } from './modules/jaeger/jaeger.module';
import { JaegerMiddleware } from './jaeger.middleware';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [Logger],
  imports: [ApiModule, RedisModule, BooksModule, JaegerModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JaegerMiddleware, LoggerMiddleware).forRoutes('/');
  }
}
