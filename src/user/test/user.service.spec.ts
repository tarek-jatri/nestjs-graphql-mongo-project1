import { UserService } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('User Service', () => {
  let userService: UserService;
  const createUserDto = {
    name: 'test user',
    phone: '01842626668',
    password: '01842626668',
  };

  const mockUserModel = {
    new: jest.fn().mockResolvedValue(createUserDto),
    create: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ _id: Date.now(), ...user }),
      ),
    find: jest.fn().mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValueOnce([{ _id: Date.now(), ...createUserDto }]),
    } as any),
    exec: jest.fn(),
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

  describe('create user', () => {
    it('should create a new user', async () => {
      const newUser = await userService.createUser(createUserDto);
      const { password, ...matchUser } = createUserDto;
      expect(newUser).toBeDefined();
      expect(newUser).toEqual({
        _id: expect.any(Number),
        password: expect.any(String),
        ...matchUser,
      });
    });
  });

  describe('Get All User', () => {
    it('should get all user', async () => {
      const allUsers = await userService.getAllUsers();
      expect(allUsers).toBeDefined();
    });
  });
});
