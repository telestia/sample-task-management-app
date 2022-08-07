import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../model/user.entity';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): UserEntity => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
