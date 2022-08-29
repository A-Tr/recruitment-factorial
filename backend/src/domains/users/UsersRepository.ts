import { Model } from 'mongoose';
import { inject, singleton } from 'tsyringe';
import { DatabaseError } from '../../common/errors/DomainError';
import { getErrorMessage } from '../../common/errors/ErrorMapper';
import { UserDb } from './model/UserDb';


@singleton()
export class UsersRepository {
  constructor(@inject('UserModel') private userModel: Model<UserDb>) {}

  async create(email: UserDb['email'], password: UserDb['password']): Promise<UserDb> {
    try {
      return await this.userModel.create({ email, password });
    } catch (error) {
      throw new DatabaseError(`Error creating user in database. ${getErrorMessage(error)}`);
    }
  }

  async findByEmail(email: UserDb['email']) {
    try {
      return await this.userModel.findOne({ email })
    } catch (error) {
      throw new DatabaseError(`Error looking for user in database. ${getErrorMessage(error)}`);
    }
  }
}
