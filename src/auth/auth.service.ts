import { BadRequestException, Injectable } from '@nestjs/common';
import { UserInterface } from '../common/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../common/interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async googleLogin(user: UserInterface): Promise<string> {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userFromDB: UserInterface = await this.userService.getUserByEmail(
      user.email,
    );

    if (!userFromDB) {
      this.userService.setNewUser(user);
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    return this.generateJwt(payload);
  }
}
