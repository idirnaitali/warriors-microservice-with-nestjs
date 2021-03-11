import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const ApiKey = createParamDecorator(
  (group: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp()
      .getRequest<Request>();
    const apikey = request.header('apikey');

    if (!apikey) {
      throw new UnauthorizedException({
        code: 'err.unauthorized',
        message: 'Missing apiKey header',
    });
    }

    if (!apikey.startsWith(group)) {
      throw new ForbiddenException({
        code: 'err.not-allowed',
        message: 'Operation not allowed for api key group',
      });
    }

    return apikey;
  },
);