import { Injectable } from '@nestjs/common';
import { UserInterface } from '../common/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../common/services/prisma/prisma.service';

@Injectable()
export class UserService {
  /*  private users: BehaviorSubject<UserInterface[]> = new BehaviorSubject<
                            UserInterface[]
                          >([]);*/
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<UserInterface> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getUserById(id: string): Promise<UserInterface> {
    return this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async setNewUser(user: UserInterface): Promise<UserInterface> {
    user.score = 1000;
    user.id = uuidv4();

    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        rating: user.score,
        userId: user.id,
      },
    });

    // users.push(user);
    // this.users.next(users);

    return newUser;
  }
}
