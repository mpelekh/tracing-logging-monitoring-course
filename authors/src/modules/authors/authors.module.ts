import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { JaegerModule } from '../jaeger/jaeger.module';

import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports: [RedisModule, JaegerModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
