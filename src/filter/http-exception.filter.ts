import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response,  } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(exception.getStatus());

    const response = exception.getResponse();
    if (response['status'] && response['info'] && response['error'] && response['details']) {
      res.json(response);
    } else {
      const payload = {
        errors: [
          {
            code: response['code'] || 'err.unknown',
            message: exception.message,
            detail: exception.getResponse()['error'],
          },
        ],
        error_reference: res.getHeader('x-trace-id'),
      };

      res.json(payload);
    }
  }
}
