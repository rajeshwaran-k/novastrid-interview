import {
    PipeTransform,
    Injectable,
    BadRequestException,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';

  import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';


  
  @Injectable()
  export class UserPipe implements PipeTransform {
    constructor(
      private readonly authService: AuthService,
      private reflector: Reflector,
    ) {}
  
    async transform({
        email,
    }: {
        email: string;
 
    }) {
      const user = await this.authService.getUser(email);

      console.log(user.email)
      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user;
    }
  }
  