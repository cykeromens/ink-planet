import { EntityManager, getConnection } from 'typeorm';
import { User } from '../../domain/user/user';
import { AfterRoutesInit, Injectable } from '@tsed/common';
import { $log } from 'ts-log-debug';



@Injectable()
export class UserRepository implements AfterRoutesInit {

  private entityManager: EntityManager;

  constructor() {
  }

  $afterRoutesInit() {
    this.entityManager = getConnection().manager;
  }

  async save(user: User): Promise<User> {
    await this.entityManager.save(user);
    $log.debug('Saved a new user with id: ',  user.id);
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.entityManager.findOne(User, id);
    $log.debug('User by id: ', user);
    return user;
  }

  async find(query: any): Promise<User[]> {
    const users = await this.entityManager.find(User, query);
    $log.debug('Loaded users: ', users);
    return users;
  }

  async delete(id: number): Promise<number> {
    const users = await this.entityManager.delete(User, id);
    $log.debug('Remove user by id: ', id);
    return users.affected;
  }
}
