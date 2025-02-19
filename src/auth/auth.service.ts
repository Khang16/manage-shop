import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && password === user.password) {
      return user;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto, session: Record<string, any>): Promise<{message: string}> {
    const { username, password } = loginUserDto;
    
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Tên đăng nhập không tồn tại');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    session.userId = user.id;
    return {
      message: 'Đăng nhập thành công'
    };
  }
}
