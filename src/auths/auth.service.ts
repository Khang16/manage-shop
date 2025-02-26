import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-auth.dto";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { AuthRepository } from "./auth.repository";
import { User } from "src/entities/user.entity";
import { PasswordUtils } from "src/common/helper";

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
  ) { }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.authRepository.show({ where: { username } });
  }

  async register (createAuthDto: CreateAuthDto): Promise<User>{
    const {username, password} = createAuthDto
    const auth = await this.authRepository.show({where: {username}})
    if(auth){
      throw new UnauthorizedException('Tên đăng ký đã tồn tại')
    }
    const bcryptPassword = await PasswordUtils.hash(password)

    return this.authRepository.create({...createAuthDto, password: bcryptPassword});
  }

  async login(loginUserDto: LoginUserDto, session: Record<string, any>): Promise<{ message: string }> {
    const { username, password } = loginUserDto
    const auth = await this.authRepository.show({where:{username}});
    const bcryptPassword = await PasswordUtils.compare(password,auth.password)
    if(!auth){
      throw new UnauthorizedException ('Tên đăng nhập không tồn tại');
    }

    if(!bcryptPassword){
      throw new UnauthorizedException("Mật khẩu không đúng")
    }

    session.authId = auth.id;
    console.log('Session after login:', session);
    return { message: 'Đăng nhập thành công' }
  }

  async delete(id: string): Promise<void> {
    return await this.authRepository.delete(id);
  }
}
