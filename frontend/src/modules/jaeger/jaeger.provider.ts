import { initTracerFromEnv } from 'jaeger-client';
import * as opentracing from 'opentracing';

export const JAEGER_CLIENT = 'JAEGER_CLIENT';
export const jaegerProvider = {
  provide: JAEGER_CLIENT,
  useFactory: async () => {
    const config = {
      serviceName: 'frontend',
      sampler: {
        type: 'const',
        param: 1,
      },
      reporter: {
        logSpans: true,
      },
    };
    const options = {
      tags: {
        'frontend.version': '0.0.1',
      },
      logger: console,
    };
    const tracer = initTracerFromEnv(config, options);

    opentracing.initGlobalTracer(tracer);

    return opentracing.globalTracer();
  },
};
