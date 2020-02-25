import { UserRepository } from '../../../../../main/server/src/respository/user/user.respository';
import { UserService } from '../../../../../main/server/src/service/user/user.service';
import { TestContext } from '@tsed/testing';

describe('UserService', () => {
  let service: UserService;
  let locals: any;
  let userSpy: any;
  let userSpyList: any;
  let userSpyRemove: any;
  let userDefault: any;
  beforeEach(TestContext.create);
  afterEach(TestContext.reset);
  beforeEach( async () => {
    userDefault = Object.assign( {
      email: 'test@test.com',
      firstName: 'AAAAA',
      lastName: 'BBBBB',
      phone: '0123456789',
      username: 'CCCCC',
      password: 'DDDDDD',
      dateCreation: new Date()
    });

    userSpy = jest.fn().mockReturnValue(Promise.resolve(userDefault));
    userSpyList = jest.fn().mockReturnValue(Promise.resolve([userDefault]));
    userSpyRemove = jest.fn();
    locals = [
      {
        provide: UserRepository,
        use: {
          save: userSpy,
          findOne: userSpy,
          find: userSpyList,
          delete: userSpyRemove
        }
      }
    ];
    service = await TestContext.invoke<UserService>(UserService, locals);
  });

  describe('User creation', () => {
    it('should fail validating incorrect email', async () => {
      userDefault.email = 'abc';
      await service.save(userDefault)
        .catch(e => expect(e.message).toEqual('Invalid email address'));
    });

    it('should validate weak passwords', async () => {
      userDefault.password = '123';
      await service.save(userDefault).catch(e => {
        expect(e.message).toEqual('Password must be 6 char long');
      });
    });

    it('should validate firstName', async () => {
      userDefault.firstName = null;
      await service.save(userDefault).catch(e => {
        expect(e.message).toEqual('Missing firstName field');
      });
    });

    it('should validate lastName', async () => {
      userDefault.lastName = null;
      await service.save(userDefault).catch(e => {
        expect(e.message).toEqual('Missing lastName field');
      });
    });

    it('should save valid user to db', async () => {
      await service.save(userDefault)
        .then(savedUser => {
          expect(savedUser).toEqual(userDefault);
          expect(userSpy).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('Get user information', () => {
      it('should find user by id', async () => {
          await service.findById(123)
            .then(user => {
              expect(user).toEqual(userDefault);
              expect(userSpy).toHaveBeenCalledTimes(1);
            });
      });

      it('should find all user', async () => {
          await service.findAll({})
            .then(res => {
              expect(res.length).toEqual(1);
              expect(res[0]).toEqual(userDefault);
              expect(userSpyList).toHaveBeenCalledTimes(1);
            });
      });
  });

  describe('Get user information', () => {
      it('should find user by id', async () => {
          await service.findById(123)
            .then(user => {
              expect(user).toEqual(userDefault);
              expect(userSpy).toHaveBeenCalledTimes(1);
            });
      });

      it('should find all user', async () => {
          await service.findAll({})
            .then(res => {
              expect(res.length).toEqual(1);
              expect(res[0]).toEqual(userDefault);
              expect(userSpyList).toHaveBeenCalledTimes(1);
            });
      });
  });

  describe('Remove user information', () => {
      it('should remove user by id', async () => {
          await service.remove(123)
            .then(user => {
              expect(userSpyRemove).toHaveBeenCalledTimes(1);
            });
      });
  });
});
