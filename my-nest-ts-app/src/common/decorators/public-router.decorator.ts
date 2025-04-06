import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { IUserNoPassWord } from 'src/modules/Users/interfaces/user.interface';

export const IS_PUBLIC_KEY = 'isPublic';
export const PublicRouter = () => SetMetadata(IS_PUBLIC_KEY, true);

interface AuthenticatedRequest extends Request {
  user: IUserNoPassWord;
}
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUserNoPassWord => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
