import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(      private readonly authService: AuthService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'qx#!g4@n6hLzCM^LD7iNGKBAsT3wR4x^5',
    });
  }
  async validate(payload: any) {
    const user = await this.authService.getUser(payload.email);

    if (!user) {
      throw new BadRequestException('User Not found');
    }
    return user;
  }
}
