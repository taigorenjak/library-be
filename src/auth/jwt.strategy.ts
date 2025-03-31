import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Privzeta vrednost za šolski projekt
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email // Ali payload.username, odvisno od vaše JWT strukture
    };
  }
}