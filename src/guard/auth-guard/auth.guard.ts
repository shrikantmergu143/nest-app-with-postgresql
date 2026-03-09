/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context?.switchToHttp?.()?.getRequest?.();
    const token = request?.headers?.authorization?.split?.(' ')?.[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      request['user'] = decoded;
      if (!token) return false;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token', error);
    }
  }
}
