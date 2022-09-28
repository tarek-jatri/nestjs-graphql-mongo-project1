import { UserService } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('User Service', () => {
  let userService: UserService;
  const mockUserModel = {
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ _id: Date.now(), ...user }),
      ),
  };
  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();
    userService = testModule.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto = {
      name: 'test user',
      phone: '01842626668',
      password: '01842626668',
    };

    expect(await userService.createUser(createUserDto)).toEqual({
      _id: expect.any(String),
      password: expect.any(String),
      ...createUserDto,
    });
  });
});
