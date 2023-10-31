import { Injectable } from '@nestjs/common';
import { UserInterface } from '../common/interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: BehaviorSubject<UserInterface[]> = new BehaviorSubject<
    UserInterface[]
  >([]);

  getUserByEmail(email: string): UserInterface {
    return this.users.value.find((user) => user.email === email);
  }

  getUserById(id: string): UserInterface {
    return this.users.value.find((user) => user.id === id);
  }

  setNewUser(user: UserInterface): UserInterface {
    const users = this.users.value;
    user.score = 1000;
    user.id = uuidv4();

    users.push(user);
    this.users.next(users);

    console.log(users);

    return user;
  }

  verifyToken(token: string): boolean {
    return !!this.users.value.find((user) => user.accessToken === token);
  }
}
