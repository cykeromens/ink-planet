import { Service } from '@tsed/common';
import { User } from '../../domain/user/user';
import { UserRepository } from '../../respository/user/user.respository';
import { ApiError } from '../../utils/error';
import { validateEmail } from '../../utils/helper.service';

@Service()
export class UserService {

  constructor(private userRepository: UserRepository) {
  }

  async save(user: User): Promise<User> {
    UserService.validateProfile(user);
    return await this.userRepository.save(user);
  }

  async update(id: number, user: User): Promise<User> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser)
        throw new ApiError('User not found', 404);
    UserService.validateProfile(user);
    user.id = id;
    return await this.userRepository.save(user);
  }

  async findAll(query: any): Promise<User[]> {
    return await this.userRepository
      .find(query);
  }

  async findById(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser)
      throw new ApiError('User not found', 404);
    return foundUser;
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }

  static validateProfile(profile: User) {
    if (!profile.email) throw new ApiError('Missing email field', 400);
    if (!validateEmail(profile.email)) throw new ApiError('Invalid email address', 400);
    if (!profile.firstName) throw new ApiError('Missing firstName field', 400);
    if (!profile.lastName) throw new ApiError('Missing lastName field', 400);
    if (profile.password && profile.password.length < 6) throw new ApiError('Password must be 6 char long', 400);
    if (profile.phone && profile.phone.length < 10) throw new ApiError('Phone number must be 10 char long', 400);
  }
}
