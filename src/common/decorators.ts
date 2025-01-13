import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserPipe } from './user-pipe';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any) {
    return user;
  }
}

export function Auth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
  );
}

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return {
      email: request.user.email
    };
  },
);

export const GetUserFromToken = () => GetUser(UserPipe);