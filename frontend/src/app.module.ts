import { Module, MiddlewareConsumer } from '@nestjs/common';

import { FrontendModule } from './modules/frontend/frontend.module';
import { ApiModule } from './modules/api/api.module';
import { JaegerModule } from './modules/jaeger/jaeger.module';
import { JaegerMiddleware } from './jaeger.middleware';

@Module({
  imports: [ApiModule, FrontendModule, JaegerModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JaegerMiddleware).forRoutes('api/v1/details');
  }
}
