import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';

import { FrontendController } from './frontend.controller';

@Module({
  imports: [ApiModule],
  controllers: [FrontendController],
})
export class FrontendModule {}
