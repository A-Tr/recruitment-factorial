import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable, singleton } from 'tsyringe';
import { getEnv } from '../../common/Env';
import { ConflictError, NotFoundError } from '../../common/errors/DomainError';
import { User } from './model/User';
import { LoginResponse } from './model/Session';
import { UsersRepository } from './UsersRepository';

@injectable()
@singleton()
export class UsersService {
  constructor(@inject(UsersRepository) private repository: UsersRepository) {}

  async signup(email: string, password: string): Promise<User> {
    const existingDbUser = await this.repository.findByEmail(email);
    if (existingDbUser) {
      throw new ConflictError(`User with email ${email} already exists in Database`)
    }
    
    await this.repository.create(email, bcrypt.hashSync(password, 10));
    return { email };    
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const dbUser = await this.repository.findByEmail(email);
    if (!dbUser) {
      throw new NotFoundError(`Incorrect username or password`);
    }

    const passwordMatch = await bcrypt.compare(password, dbUser.password)
    if (passwordMatch === false) {
      throw new NotFoundError(`Incorrect username or password`);
    }

    const token = jwt.sign({ email }, getEnv('JWT_SECRET'), { expiresIn: 60 * 60 });
    return { email, token, tokenExpiresIn: 60 * 60 * 1000 };
  }
}
