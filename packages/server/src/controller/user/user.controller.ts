import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Required, Status } from '@tsed/common';
import { Description, Summary } from '@tsed/swagger';
import { NotFound } from 'ts-httpexceptions';
import { UserService } from '../../service/user/user.service';
import { User } from '../../domain/user/user';
import { ApiError } from '../../utils/error';
import { Validator } from 'typescript-param-validator';


@Controller('/users')
export class UserController {

  constructor(private userService: UserService) {

  }

  @Get('/')
  @Summary('Return all users')
  @Status(200, {description: 'Success', type: User, collectionType: Array})
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll({});
  }

  @Get('/:id')
  @Summary('Return a user from his ID')
  @Status(200, {description: 'Success', type: User})
  async get(@Required() @PathParams('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post('/')
  @Summary('Create a new User')
  @Status(201, {description: 'Created', type: User})
  save(@Description('User model')
       @Validator() @BodyParams() user: User) {
    return this.userService.save(user);
  }

  @Put('/:id')
  @Summary('Update user information')
  @Status(200, {description: 'Success', type: User})
  async update(@PathParams('id') @Required() id: number,
               @Validator() @BodyParams() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  @Summary('Remove a user.')
  @Status(204, {description: 'No content'})
  async remove(@PathParams('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
