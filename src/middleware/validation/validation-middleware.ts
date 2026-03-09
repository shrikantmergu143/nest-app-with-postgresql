/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import response from 'src/constants/response';
import { CONSTANT } from 'src/constants/message';

const validationMiddleware = (schema: ObjectSchema) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      const { error } = schema?.validate(req?.body, {
        abortEarly: false,
        allowUnknown: true, // ← IMPORTANT
      });
      if (error) {
        if (req?.file && fs.existsSync(req.file.path)) {
          fs.rmSync(req.file.path);
        }
        return response.validationError(
          {
            message: CONSTANT.ERROR.VALIDATION,
            data: error.message.replace(/(\"|\[|\d\])/g, ''),
          },
          res,
        );
      } else {
        next();
      }
    } catch (error) {
      return response.failureResponse(error, res);
    }
  };
};

export default validationMiddleware;
