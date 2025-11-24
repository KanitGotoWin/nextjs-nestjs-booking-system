import { Test, TestingModule } from '@nestjs/testing';
import { BookingConfigsService } from './booking-configs.service';
import { BookingConfigsRepository } from './repositories/booking-configs.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateBookingConfigDto } from './dto/update-booking-config.dto';
import { ServiceResponseBookingConfigDto } from './dto/service-response-booking-config.dto';

const mockBookingConfigsRepository = {
  getValueByKey: jest.fn(),
  updateByKey: jest.fn(),
};

describe('BookingConfigsService - Unit test', () => {
  let service: BookingConfigsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingConfigsService,
        {
          provide: BookingConfigsRepository,
          useValue: mockBookingConfigsRepository,
        },
      ],
    }).compile();

    service = module.get<BookingConfigsService>(BookingConfigsService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCapacity()', () => {
    it('getCapacity returns value if exists', async () => {
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue('100');

      const result = await service.getCapacity();
      expect(result).toBe('100');
      expect(mockBookingConfigsRepository.getValueByKey).toHaveBeenCalledWith(
        'capacity',
      );
    });

    it('getCapacity throws error if value is null', async () => {
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue(null);

      await expect(service.getCapacity()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update()', () => {
    const key = 'capacity';
    const dto: UpdateBookingConfigDto = { value: '100' };
    const response: ServiceResponseBookingConfigDto = {
      id: 1,
      key,
      value: '100',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should throw InternalServerErrorException if key not found', async () => {
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue(null);

      await expect(service.update(key, dto)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(mockBookingConfigsRepository.getValueByKey).toHaveBeenCalledWith(
        key,
      );
    });

    it('should update and return the updated value if key exists', async () => {
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue('50');
      mockBookingConfigsRepository.updateByKey.mockResolvedValue(response);

      const result = await service.update(key, dto);

      expect(result).toEqual(response);
      expect(mockBookingConfigsRepository.getValueByKey).toHaveBeenCalledWith(
        key,
      );
      expect(mockBookingConfigsRepository.updateByKey).toHaveBeenCalledWith(
        key,
        dto,
      );
    });

    it('should not call updateByKey if key does not exist', async () => {
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue(null);

      await expect(service.update(key, dto)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.update(key, dto)).rejects.toThrow('Key not found');

      expect(mockBookingConfigsRepository.updateByKey).not.toHaveBeenCalled();
    });
  });
});
