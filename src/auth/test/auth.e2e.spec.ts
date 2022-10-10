import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { faker } from '@faker-js/faker';
import request = require('supertest');

describe('Auth e2e', () => {
  const url = '/graphql';
  let app: INestApplication;
  let http;
  const payload = {
    name: faker.name.fullName(),
    phone: faker.phone.number('+8801#########'),
    password: '12345678',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication();
    http = app.getHttpServer();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  describe('Sign Up', () => {
    it('should sign up a new user', () => {
      return request(http)
        .post(url)
        .send({
          query: `mutation Signup($userSignupInput: UserSignupInput!) {
                    signup(userSignupInput: $userSignupInput) {
                      _id
                      name
                      phone
                    }
                  }`,
          variables: `{"userSignupInput":${JSON.stringify(payload)}}`,
        })
        .expect(200)
        .expect((res) => {
          console.log('----> ', res.body.data.signup);
        });
    });
  });
});
