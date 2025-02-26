import { BadRequestException, Body, Controller, Delete, Param, Patch, Post, Session, UseFilters, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { LoginUserDto } from "../dto/login-auth.dto";
import { CreateAuthDto } from "../dto/create-auth.dto";
import { AllExceptionsFilter } from "src/common/helper";
import { AuthGuard } from "@nestjs/passport";

@Controller('api/v1/auth/')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Session() session: Record<string, any>,
  ) {
    return this.authService.login(loginUserDto, session);
  }

  @Post('sign_up')
  async signUp(
    @Body() createUserDto: CreateAuthDto,
  ) {
    return this.authService.register(createUserDto);
  }


  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.delete(id);
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