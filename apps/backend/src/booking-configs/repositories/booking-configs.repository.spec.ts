import { Test, TestingModule } from '@nestjs/testing';
import { BookingConfigsRepository } from './booking-configs.repository';
import { PrismaService } from 'src/prisma/prisma.service';

const mockPrismaService = {
  bookingConfig: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('BookingConfigsRepository - Unit test', () => {
  let repository: BookingConfigsRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingConfigsRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<BookingConfigsRepository>(BookingConfigsRepository);
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getValueByKey()', () => {
    it('should return the value if config exists', async () => {
      mockPrismaService.bookingConfig.findUnique.mockResolvedValue({
        key: 'capacity',
        value: '100',
      });

      const result = await repository.getValueByKey('capacity');

      expect(result).toBe('100');
      expect(mockPrismaService.bookingConfig.findUnique).toHaveBeenCalledWith({
        where: { key: 'capacity' },
      });
    });

    it('should return null if config not found', async () => {
      mockPrismaService.bookingConfig.findUnique.mockResolvedValue(null);

      const result = await repository.getValueByKey('capacity');

      expect(result).toBeNull();
      expect(mockPrismaService.bookingConfig.findUnique).toHaveBeenCalledWith({
        where: { key: 'capacity' },
      });
    });
  });

  describe('updateByKey()', () => {
    it('should update config and return updated object', async () => {
      const data = { value: '200' };
      const resultMock = {
        key: 'capacity',
        value: '200',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.bookingConfig.update.mockResolvedValue(resultMock);

      const result = await repository.updateByKey('capacity', data);

      expect(result).toEqual(resultMock);

      expect(mockPrismaService.bookingConfig.update).toHaveBeenCalledWith({
        where: { key: 'capacity' },
        data,
      });
    });
  });
});
