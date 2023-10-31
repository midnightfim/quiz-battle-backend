import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UserService } from './user.service';
import { CacheTTL } from '@nestjs/common/cache';
import { UserInterface } from '../common/interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(CacheInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @CacheTTL(30)
  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.getUserById(id);
  }
}
