import { Module } from '@nestjs/common';
import { jaegerProvider } from './jaeger.provider';

@Module({
  providers: [jaegerProvider],
  exports: [jaegerProvider],
})
export class JaegerModule {}
