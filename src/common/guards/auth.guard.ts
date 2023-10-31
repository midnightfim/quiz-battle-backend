import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // try {
    //   const request = context.switchToHttp().getRequest();
    //   const { authorization }: any = request.headers;
    //   if (!authorization || authorization.trim() === '') {
    //     throw new UnauthorizedException('Please provide token');
    //   }
    //   const authToken = authorization.replace(/bearer/gim, '').trim();
    //   this.userService.verifyToken(authToken);
    //   return true;
    // } catch (error) {
    //   console.log('auth error - ', error.message);
    //   throw new ForbiddenException(
    //     error.message || 'session expired! Please sign In',
    //   );
    // }
    return true;
  }
}
