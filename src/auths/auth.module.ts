import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./auth.service";
import { DataSource } from "typeorm";
import { AuthRepository } from "./auth.repository";
import { User } from "src/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import * as passport from 'passport';

@Module({
  imports: [ TypeOrmModule.forFeature([User]), PassportModule.register({ session: true })],

  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AuthRepository',
      useFactory: (dataSource: DataSource)=> new AuthRepository(dataSource),
      inject: [DataSource]
    },
    LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule{
  constructor(private readonly authService: AuthService) {
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }
}