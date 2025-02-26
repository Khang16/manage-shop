import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = {
      'id': 1,
      'username': 'admin2',
      'password': 'admin2',
    };
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}