import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_TOKEN || 'SECRET',
    });
  }

  async validate(payload: any) {
    const { sub, ...rest } = payload;
    return {
      id: payload.sub,
      ...rest,
    };
  }
}
