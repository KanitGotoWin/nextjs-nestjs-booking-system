import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserRepository - Unit test', () => {
  let userRepository: UserRepository;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
  };

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should return user if email exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser);

    const result = await userRepository.findByEmail('test@example.com');
    expect(result).toEqual(mockUser);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
  });

  it('should return null if user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await userRepository.findByEmail('notfound@example.com');
    expect(result).toBeNull();
  });
});
