import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';

import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports: [RedisModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
