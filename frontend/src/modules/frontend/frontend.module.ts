import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { JaegerModule } from '../jaeger/jaeger.module';

import { FrontendController } from './frontend.controller';

@Module({
  imports: [ApiModule, JaegerModule],
  controllers: [FrontendController],
})
export class FrontendModule {}
