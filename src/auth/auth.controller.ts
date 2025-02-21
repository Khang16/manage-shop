import { BadRequestException, Body, Controller, Delete, Post, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('api/v1/auth/')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Session() session: Record<string, any>,
  ) {
    return this.authService.login(loginUserDto, session);
  }
  @Post('logout')
  logout(@Session() session: Record<string, any>) {
    session.destroy((err) => {
      if (err) {
        throw new BadRequestException('Failed to log out');
      }
    });
    return { message: 'Logged out successfully' };
  }
}