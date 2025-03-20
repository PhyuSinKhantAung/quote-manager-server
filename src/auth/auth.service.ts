import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dtos';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthApiResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthApiResponse> {
    const hashedPassword = await this.hashedUserPassword(dto.password.trim());

    const user = await this.userService.createUser({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
    });

    const token = await this.generateToken({
      sub: user.id,
      email: user.email,
    });

    return {
      message: 'User registered successfully',
      token,
    };
  }

  async signin(dto: LoginDto): Promise<AuthApiResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    const isValidPassword = await argon.verify(
      user.password,
      dto.password.trim(),
    );

    if (!isValidPassword) throw new ForbiddenException('Credentials incorrect');

    const payload = { sub: user.id, email: user.email };

    const token = await this.generateToken(payload);

    return {
      message: 'Login successful',
      token,
    };
  }

  private async generateToken(payload: {
    sub: string;
    email: string;
  }): Promise<string> {
    return this.jwt.sign(payload, {
      expiresIn: '30d',
      secret: this.config.get('JWT_SECRET'),
    });
  }

  private async hashedUserPassword(password: string) {
    return await argon.hash(password);
  }
}
