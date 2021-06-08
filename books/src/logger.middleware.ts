import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as expressWinston from 'express-winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use: (req: Request, res: Response, next: NextFunction) => void;

  constructor(private readonly logger: Logger) {
    this.use = expressWinston.logger({
      winstonInstance: this.logger as any,
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    });
  }
}
