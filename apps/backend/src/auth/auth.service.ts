import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(LoginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = LoginDto;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, name: user.name, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
