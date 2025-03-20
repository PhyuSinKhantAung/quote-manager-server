import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMe(@GetUser('id') id: string) {
    const user = await this.userService.getUserById(id);

    return user;
  }
}
