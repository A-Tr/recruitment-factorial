import * as dotenv from 'dotenv';
dotenv.config()

import { UserModel } from '../src/domains/users/model/UserDb';
import { connectToDb, disconnectFromDb } from '../src/common/Database';


async function seedUsers() {
  await connectToDb()
  await UserModel.create({ email: 'alvaro@test.com', password: "$2b$10$ThmIs2lx5CL2d7GmB8HxSuCtoskp0ZxAeR7OJ.8idGqBaJmwIomIy" })
  console.log('User created')
  await disconnectFromDb()
}

seedUsers()