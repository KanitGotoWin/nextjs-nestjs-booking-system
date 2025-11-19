import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;
  let spy: jest.Mocked<PrismaService['user']>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
    spy = prisma.user as jest.Mocked<PrismaService['user']>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const input: CreateUserDto = { name: 'Test User', email: 'test@test.com' };
    const createdUser = { id: 1, ...input, createdAt: new Date() };
    let result: ResponseUserDto;

    beforeEach(async () => {
      jest.spyOn(spy, 'create').mockResolvedValue(createdUser);
      result = await service.create(input);
    });

    test('this should be able call prisma.user.create with test input data', () => {
      expect(spy.create).toHaveBeenCalledWith({ data: input });
      expect(spy.create).toHaveBeenCalledTimes(1);
    });

    test('this should return the created user', () => {
      expect(result).toStrictEqual(createdUser);
    });
  });
});
