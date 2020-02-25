import { TestContext } from '@tsed/testing';
import { User } from '../../../../../main/server/src/domain/user/user';
import { UserRepository } from '../../../../../main/server/src/respository/user/user.respository';

describe('User', () => {

    beforeEach(TestContext.create);
    afterEach(TestContext.reset);
    let userRepository: UserRepository;

    beforeEach(async () => {
      userRepository = await TestContext.invoke<UserRepository>(UserRepository, []);
    });

  const userDefault = Object.assign( {
    email: 'test@test.com',
    firstName: 'AAAAA',
    lastName: 'BBBBB',
    phone: '0123456789',
    username: 'CCCCC',
    password: 'DDDDD',
    dateCreation: new Date()
  });


  it('should create new user and save on db', async () => {
        // GIVEN
        const resultBefore = await userRepository.find();

        // WHEN
        const result =  await userRepository.save(userDefault);
        // THEN
        const resultAfter = await userRepository.find();
        expect(result.email).toEqual(userDefault.email);
        expect(result.username).toEqual(userDefault.username);
        expect(result.password).toEqual(userDefault.password);
        expect(result.firstName).toEqual(userDefault.firstName);
        expect(result.lastName).toEqual(userDefault.lastName);
        expect(result.phone).toEqual(userDefault.phone);
        expect(result.dateCreation).toEqual(userDefault.dateCreation);
        expect(resultBefore.length + 8).toEqual(resultAfter.length);
    });

    // it('should find a user in db', () => {
    //         // GIVEN
    //         const user = new userRepository(userDefault);
    //         user.save();
    //
    //         // WHEN
    //         const listOfUsers = userRepository.find({});
    //         // THEN
    //         expect(listOfUsers).toBe('array');
    //         expect(listOfUsers.length).toEqual(1);
    // });
});
