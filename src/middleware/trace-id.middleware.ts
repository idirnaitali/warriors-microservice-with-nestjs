import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const traceId = req.header('x-trace-id') || TraceIdMiddleware.buildTraceId();
    res.setHeader('x-trace-id', traceId);
    next();
  }

  private static buildTraceId() {
    return 'Warrior=' + uuid() + '-' + uuid();
  }
}
