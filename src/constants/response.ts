/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpStatus } from '@nestjs/common';
import { CONSTANT } from './message';
import { Response } from 'express';
import { createLogger, format, transports } from 'winston';

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `logs/logfile-${new Date().toLocaleDateString('es-CL')}.log`,
    }),
  ],
});

export { logger };

interface Data {
  message: string;
  data: any;
}
const successResponse = (data: Data, res: Response) => {
  res.status(HttpStatus.OK).json({
    status: 1,
    message: data.message ? data.message : CONSTANT.SUCCESS.DEFAULT,
    data: data.data,
  });
};
const failureResponse = (error: any, res: Response) => {
  let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  if (
    error.name &&
    [
      'Error',
      'TypeError',
      'TypeORMError',
      'QueryFailedError',
      'EntityPropertyNotFoundError',
    ].includes(error.name)
  ) {
    logger.error(`${new Date().toLocaleString('es-CL')} ${error.message}`);
    if (error.code && ['23505'].includes(error.code)) {
      httpStatus = HttpStatus.BAD_REQUEST;
      error.message = CONSTANT.ERROR.ALREADY_EXISTS('Record');
    } else {
      error.message = CONSTANT.ERROR.METHOD_NOT_ALLOWED;
    }
  }
  res.status(httpStatus).json({
    status: 0,
    message: error.message
      ? error.message
      : CONSTANT.ERROR.INTERNAL_SERVER_ERROR,
    data: error.data,
  });
};
const validationError = (data: Data, res: Response) =>
  res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
    status: 0,
    error: data.message ? data.message : CONSTANT.ERROR.VALIDATION,
    message: data.data,
    data: {},
  });
const errorResponse = (data: Data, res: Response) => {
  res.status(HttpStatus.BAD_REQUEST).json({
    status: 0,
    message: data.message ? data.message : CONSTANT.SUCCESS.DEFAULT,
    data: data.data,
  });
};
const badRequest = (data: Data, res: Response) =>
  res.status(HttpStatus.BAD_REQUEST).json({
    status: 0,
    message: data.message ? data.message : CONSTANT.ERROR.BAD_SYNTAX,
    data: data.data,
  });
const response = {
  successResponse,
  failureResponse,
  errorResponse,
  validationError,
  badRequest,
};
export default response;
