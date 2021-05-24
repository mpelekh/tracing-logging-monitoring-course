import { Module } from '@nestjs/common';

import { FrontendModule } from './modules/frontend/frontend.module';
import { ApiModule } from './modules/api/api.module';

@Module({
  imports: [ApiModule, FrontendModule],
})
export class AppModule {}
