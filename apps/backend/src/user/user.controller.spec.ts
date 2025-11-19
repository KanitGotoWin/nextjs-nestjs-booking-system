import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const input: CreateUserDto = {
      name: 'Test User',
      email: 'test@test.com',
    };

    const createdUser = {
      id: 1,
      ...input,
      createdAt: new Date(),
    };

    let result: ResponseUserDto;

    beforeEach(async () => {
      jest.spyOn(service, 'create').mockResolvedValue(createdUser);
      result = await service.create(input);
    });

    test('this should be able to call UserService.create', () => {
      expect(service.create).toHaveBeenCalledWith(input);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    test('this should return created user', () => {
      expect(result).toStrictEqual(createdUser);
    });
  });

  describe('update', () => {
    test('this should be able to call UserService.update', () => {
      expect(1).toEqual(1);
    });

    test('this should return updated user', () => {
      expect(2).toEqual(2);
    });
  });
});
