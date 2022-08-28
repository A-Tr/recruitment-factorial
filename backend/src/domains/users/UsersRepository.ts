import { singleton } from 'tsyringe';
import { DatabaseError } from '../../common/errors/DomainError';
import { getErrorMessage } from '../../common/errors/ErrorMapper';
import { UserDb, UserModel } from './model/UserDb';


@singleton()
export class UsersRepository {
  async create(email: UserDb['email'], password: UserDb['password']): Promise<UserDb> {
    try {
      return UserModel.create({ email, password });
    } catch (error) {
      throw new DatabaseError(`Error creating user in database. ${getErrorMessage(error)}`);
    }
  }

  async findByEmail(email: UserDb['email']) {
    try {
      return UserModel.findOne({ email })
    } catch (error) {
      throw new DatabaseError(`Error looking for user in database. ${getErrorMessage(error)}`);
    }
  }
}
