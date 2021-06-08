import { Module, MiddlewareConsumer, Logger } from '@nestjs/common';

import { FrontendModule } from './modules/frontend/frontend.module';
import { ApiModule } from './modules/api/api.module';
import { JaegerModule } from './modules/jaeger/jaeger.module';
import { JaegerMiddleware } from './jaeger.middleware';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [Logger],
  imports: [ApiModule, FrontendModule, JaegerModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JaegerMiddleware, LoggerMiddleware).forRoutes('/');
  }
}
