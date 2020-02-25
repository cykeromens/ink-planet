// import { TestContext } from '@tsed/testing';
// import { ExpressApplication } from '@tsed/common';
// import * as SuperTest from 'supertest';
// import { Server } from '../../../../main/server/server';
//
// describe('UserController', () => {
//     // bootstrap your Server to load all endpoints before run your test
//     let request: SuperTest.SuperTest<SuperTest.Test>;
//
//     beforeEach(TestContext.bootstrap(Server));
//     beforeEach(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
//         request = SuperTest(expressApplication);
//     }));
//
//     afterEach(TestContext.reset);
//
//     describe('GET /api/users', () => {
//         it('should get all users as array', async () => {
//             // const response = await request.get('/api/users').expect(200);
//             //
//             // expect(response.body).toBe('array');
//         });
//
//     });

    // describe('POST /api/users', () => {
    //     it('should POST new user', async () => {
    //         const response = await request.post('/api/users').expect(200);
    //
    //         expect(response.body).to.be.an('array');
    //     });
    //
    //     it('should POST existing user', async () => {
    //         const response = await request.post('/api/users').expect(200);
    //
    //         expect(response.body).to.be.an('array');
    //     });
    // });
    //
    // describe('PUT /api/users', () => {
    //     let userRepository;
    //     beforeEach(TestMongooseContext.inject([User], async (userModel: MongooseModel<User>) => {
    //             await TestContext.create();
    //             await TestMongooseContext.create();
    //             userRepository = userModel;
    //         })
    //     );
    //     afterEach(async () => {
    //         await TestContext.reset();
    //         await TestMongooseContext.reset();
    //
    //     });
    //
    //     it('should PATCH existing user', async () => {
    //         const user = await userRepository.create(userStub);
    //         const response = await request.patch('/api/users' + user._id).expect(200);
    //
    //         expect(response.body.firsName).to.be.equal(user.firstName);
    //     });
    //
    //     it('should PATCH non-existing user', async () => {
    //         const response = await request.put('/api/users').expect(200);
    //
    //         expect(response.body).to.be.an('array');
    //     });
    // });
    //
    // describe('DELETE /api/users', () => {
    //     it('should POST new user', async () => {
    //         const response = await request.put('/api/users').expect(200);
    //
    //         expect(response.body).to.be.an('array');
    //     });
    // });
// });


import { inject, TestContext } from '@tsed/testing';
import { ExpressApplication } from '@tsed/common';
import * as SuperTest from 'supertest';
import { Server } from '../../../../main/server/src/server';
import { UserRepository } from '../../../../main/server/src/respository/user/user.respository';
import { User } from '../../../../main/server/src/domain/user/user';

describe('UserController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let userDefault: User;

  beforeEach(TestContext.bootstrap(Server));
  beforeEach(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
      request = SuperTest(expressApplication);
  }));

  userDefault = Object.assign( {
    email: 'test@test.com',
    firstName: 'AAAAA',
    lastName: 'BBBBB',
    phone: '0123456789',
    username: 'CCCCC',
    password: 'DDDDDD',
  });

  afterEach(TestContext.reset);


  describe('GET /api/users', async () => {
        it('should get all users when list is empty', () => {
            request.get('/api/users')
              .expect(200)
              .then(res => {
                expect(res.body).toEqual([]);
              });
        });

        it('should get list of users', () => {
            request.get('/api/users')
              .expect(200)
              .then(res => {
                expect(res.body).toEqual([]);
              });
        });
  });

  describe('POST /api/users', () => {
        it('should POST new user', () => {
            request.post('/api/users')
              .send(userDefault)
              .expect(200)
              .then(user => {
                expect(user.body.email).toBe(userDefault.email);
                expect(user.body.firstName).toBe(userDefault.firstName);
                expect(user.body.lastName).toBe(userDefault.lastName);
              });
        });

        it('should POST existing user', (inject([UserRepository], async (userRepository: UserRepository) => {
          await userRepository.save(userDefault);

          request.post('/api/users')
            .send(userDefault)
            .expect(200)
            .then(user => {
              expect(user.body.email).toBe(userDefault.email);
              expect(user.body.firstName).toBe(userDefault.firstName);
              expect(user.body.lastName).toBe(userDefault.lastName);
            });
        })));
  });
    //
    // describe('PUT /api/users', () => {
    //     let userRepository;
    //     beforeEach(TestMongooseContext.inject([User], async (userModel: MongooseModel<User>) => {
    //             await TestContext.create();
    //             await TestMongooseContext.create();
    //             userRepository = userModel;
    //         })
    //     );
    //     afterEach(async () => {
    //         await TestContext.reset();
    //         await TestMongooseContext.reset();
    //
    //     });
    //
    //     it('should PATCH existing user', async () => {
    //         const user = await userRepository.create(userStub);
    //         const response = await request.patch('/api/users' + user._id).expect(200);
    //
    //         expect(response.body.firsName).to.be.equal(user.firstName);
    //     });
    //
    //     it('should PATCH non-existing user', async () => {
    //         const response = await request.put('/api/users').expect(200);
    //
    //         expect(response.body).to.be.an('array');
    //     });
    // });
    //
    // describe('DELETE /api/users', () => {
    //     it('should POST new user', async () => {
    //         const response = await request.put('/api/users').expect(200);
    //
    //         expect(response.body).to.be.an('array');
    //     });
    // });
});
