import 'reflect-metadata';

import { container } from 'tsyringe';
import { UsersRepository } from '../../../src/domains/users/UsersRepository';
import { DatabaseError, NotFoundError } from '../../../src/common/errors/DomainError';

const mockFindOne = jest.fn();
const mockCreate = jest.fn();
const mockModel = {
  findOne: mockFindOne,
  create: mockCreate
}
describe('UsersRepository tests', () => {
  let repo: UsersRepository;

  beforeEach(() => {
    jest.resetAllMocks();
    repo = container.register('UserModel', {useValue: mockModel }).resolve(UsersRepository);
  });

  describe('findByEmail tests', () => {
    test('should invoke model.findOne with proper arguments', async () => {
      const TEST_USER_EMAIL = 'user@test.com'
      const resultDb = {
        email: TEST_USER_EMAIL,
        password: '1234',
      }
      mockFindOne.mockResolvedValue(resultDb);

      const res = await repo.findByEmail(TEST_USER_EMAIL);
      expect(mockFindOne).toHaveBeenCalledWith({email: TEST_USER_EMAIL});
      expect(res).toEqual(resultDb)
    });

    test('should invoke model.findOne with proper arguments', async () => {
      const TEST_USER_EMAIL = 'user@test.com'

      mockFindOne.mockRejectedValue('Error establishing database connection');

      expect.assertions(2)
      try {
        await repo.findByEmail(TEST_USER_EMAIL);
      } catch (error) {
        expect(mockFindOne).toHaveBeenCalledWith({email: TEST_USER_EMAIL});
        expect((error as DatabaseError).message).toEqual('Database error: Error looking for user in database. Error establishing database connection')
      }
    });
  });
});
