import { ExceptionFilter, Catch, ArgumentsHost, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

@Catch() // Bắt tất cả lỗi
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception.message || 'Internal Server Error';

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}

export const responsePaginate = (data, total, limit=10, page=1) => {
  return{
    data,
    page: +page,
    limit: +limit,
    total: total,
    totalPage: Math.ceil(total/limit)
  }
}