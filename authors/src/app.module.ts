import { Module, MiddlewareConsumer } from '@nestjs/common';

import { AuthorsModule } from './modules/authors/authors.module';
import { RedisModule } from './modules/redis/redis.module';
import { JaegerModule } from './modules/jaeger/jaeger.module';
import { JaegerMiddleware } from './jaeger.middleware';

@Module({
  imports: [RedisModule, AuthorsModule, JaegerModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JaegerMiddleware).forRoutes('/');
  }
}
