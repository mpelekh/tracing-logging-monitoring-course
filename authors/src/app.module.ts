import { Module, MiddlewareConsumer, Logger } from '@nestjs/common';
import { PromModule } from '@digikare/nestjs-prom';
import { AuthorsModule } from './modules/authors/authors.module';
import { RedisModule } from './modules/redis/redis.module';
import { JaegerModule } from './modules/jaeger/jaeger.module';
import { JaegerMiddleware } from './jaeger.middleware';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [Logger],
  imports: [
    RedisModule,
    AuthorsModule,
    JaegerModule,
    PromModule.forRoot({
      defaultLabels: {
        app: 'authors',
      },
      withHttpMiddleware: {
        enable: true,
      },
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JaegerMiddleware, LoggerMiddleware).forRoutes('/');
  }
}
