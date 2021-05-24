import { Module } from '@nestjs/common';

import { AuthorsModule } from './modules/authors/authors.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [RedisModule, AuthorsModule],
})
export class AppModule {}
