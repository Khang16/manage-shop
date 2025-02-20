import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permissions/permission.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UserModule,
    PermissionModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
