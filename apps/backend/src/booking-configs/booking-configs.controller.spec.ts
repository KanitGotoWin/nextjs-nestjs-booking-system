import { Test, TestingModule } from '@nestjs/testing';
import { BookingConfigsController } from './booking-configs.controller';
import { BookingConfigsService } from './booking-configs.service';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateBookingConfigDto } from './dto/update-booking-config.dto';
import { ServiceResponseBookingConfigDto } from './dto/service-response-booking-config.dto';

describe('BookingConfigsController - Unit Test', () => {
  let controller: BookingConfigsController;
  const mockBookingConfigsService = {
    getCapacity: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingConfigsController],
      providers: [
        {
          provide: BookingConfigsService,
          useValue: mockBookingConfigsService,
        },
      ],
    }).compile();

    controller = module.get<BookingConfigsController>(BookingConfigsController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  // GET /booking-configs
  describe('getCapacity()', () => {
    it('should return capacity value from service', async () => {
      mockBookingConfigsService.getCapacity.mockResolvedValue('100');

      const result = await controller.getCapacity();
      expect(result).toBe('100');
      expect(mockBookingConfigsService.getCapacity).toHaveBeenCalledTimes(1);
    });

    it('should throw InternalServerErrorException when service throws', async () => {
      mockBookingConfigsService.getCapacity.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(controller.getCapacity()).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockBookingConfigsService.getCapacity).toHaveBeenCalledTimes(1);
    });
  });

  // PATCH /booking-configs/:key
  describe('update()', () => {
    const key = 'capacity';
    const dto: UpdateBookingConfigDto = { value: '999' };
    const mockResponse: ServiceResponseBookingConfigDto = {
      id: 1,
      key,
      value: '999',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return updated config when service succeeds', async () => {
      mockBookingConfigsService.update.mockResolvedValue(mockResponse);

      const result = await controller.update(key, dto);
      expect(result).toEqual(mockResponse);
      expect(mockBookingConfigsService.update).toHaveBeenCalledTimes(1);
      expect(mockBookingConfigsService.update).toHaveBeenCalledWith(key, dto);
    });

    it('should throw InternalServerErrorException when service throws', async () => {
      mockBookingConfigsService.update.mockRejectedValue(
        new InternalServerErrorException('Key not found'),
      );

      await expect(controller.update(key, dto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockBookingConfigsService.update).toHaveBeenCalledTimes(1);
      expect(mockBookingConfigsService.update).toHaveBeenCalledWith(key, dto);
    });
  });
});
