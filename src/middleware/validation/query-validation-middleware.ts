import response from 'src/constants/response';
import validate from '.';
import { CONSTANT } from 'src/constants/message';

const queryValidationMiddleware = (schema: any) => {
  return (req: any, res: any, next: any) => {
    const isValid: any = validate(req.query, schema);
    if (isValid.error) {
      return response?.validationError(
        { message: CONSTANT.ERROR.VALIDATION, data: isValid.error },
        res,
      );
    } else {
      next();
    }
  };
};
export default queryValidationMiddleware;
