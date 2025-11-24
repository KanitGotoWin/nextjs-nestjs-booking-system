import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { BookingsRepository } from './repositories/bookings.repository';
import { BookingConfigsRepository } from 'src/booking-configs/repositories/booking-configs.repository';
import { BookingsGateway } from './bookings.gateway';

const mockBookingsRepository = {
  findByEmail: jest.fn(),
  findByName: jest.fn(),
  countBooking: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
};

const mockBookingConfigsRepository = {
  getValueByKey: jest.fn(),
};

const mockBookingsGateway = {
  reRenderBookings: jest.fn(),
  notifyFull: jest.fn(),
  notifyAvailable: jest.fn(),
};

describe('BookingsService - Unit Test', () => {
  let service: BookingsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: BookingsRepository, useValue: mockBookingsRepository },
        {
          provide: BookingConfigsRepository,
          useValue: mockBookingConfigsRepository,
        },
        { provide: BookingsGateway, useValue: mockBookingsGateway },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  // ---------------------------------------------------------------------
  // create()
  // ---------------------------------------------------------------------
  describe('create()', () => {
    const dto = { name: 'John', email: 'john@example.com' };

    it('should throw if email already exists', async () => {
      mockBookingsRepository.findByEmail.mockResolvedValue(dto);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw if name already exists', async () => {
      mockBookingsRepository.findByEmail.mockResolvedValue(null);
      mockBookingsRepository.findByName.mockResolvedValue(dto);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw if capacity config missing', async () => {
      mockBookingsRepository.findByEmail.mockResolvedValue(null);
      mockBookingsRepository.findByName.mockResolvedValue(null);
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should throw ConflictException if fully booked', async () => {
      mockBookingsRepository.findByEmail.mockResolvedValue(null);
      mockBookingsRepository.findByName.mockResolvedValue(null);
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue('5');
      mockBookingsRepository.countBooking.mockResolvedValue(5);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });

    it('should create booking successfully and notify if full', async () => {
      mockBookingsRepository.findByEmail.mockResolvedValue(null);
      mockBookingsRepository.findByName.mockResolvedValue(null);
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue('2');

      mockBookingsRepository.countBooking
        .mockResolvedValueOnce(1) // before creation
        .mockResolvedValueOnce(2); // after creation = full

      const createdBooking = { ...dto, createdAt: new Date() };
      mockBookingsRepository.create.mockResolvedValue(createdBooking);

      const result = await service.create(dto);

      expect(result).toEqual(createdBooking);
      expect(mockBookingsGateway.reRenderBookings).toHaveBeenCalled();
      expect(mockBookingsGateway.notifyFull).toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------
  // findAll()
  // ---------------------------------------------------------------------
  describe('findAll()', () => {
    it('should throw if capacity missing', async () => {
      mockBookingsRepository.findAll.mockResolvedValue([]);
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue(null);

      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should return booking list with availableSeats and status', async () => {
      const bookings = [
        {
          name: 'Alice',
          email: 'alice@example.com',
        },
      ];

      mockBookingsRepository.findAll.mockResolvedValue(bookings);
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue('5');

      const result = await service.findAll();

      expect(result).toEqual({
        bookings: [
          {
            name: bookings[0].name,
            email: bookings[0].email,
          },
        ],
        availableSeats: 4, // 5 capacity - 1 booking
        status: 'available',
      });
    });
  });

  // ---------------------------------------------------------------------
  // remove()
  // ---------------------------------------------------------------------
  describe('remove()', () => {
    const email = 'john@example.com';

    it('should throw NotFoundException if booking does not exist', async () => {
      mockBookingsRepository.findByEmail.mockResolvedValue(null);

      await expect(service.remove(email)).rejects.toThrow(NotFoundException);
    });

    it('should remove and return name without config', async () => {
      const existing = { name: 'John', email };
      mockBookingsRepository.findByEmail.mockResolvedValue(existing);
      mockBookingsRepository.remove.mockResolvedValue(undefined);
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue(null);

      const result = await service.remove(email);

      expect(result).toBe('John');
      expect(mockBookingsGateway.reRenderBookings).toHaveBeenCalled();
    });

    it('should notify available when capacity reopens', async () => {
      const existing = { name: 'John', email };
      mockBookingsRepository.findByEmail.mockResolvedValue(existing);

      mockBookingsRepository.remove.mockResolvedValue(undefined);
      mockBookingConfigsRepository.getValueByKey.mockResolvedValue('3');

      mockBookingsRepository.countBooking.mockResolvedValue(2); // 3 - 1 == 2 triggers notify

      const result = await service.remove(email);

      expect(result).toBe('John');
      expect(mockBookingsGateway.notifyAvailable).toHaveBeenCalled();
    });
  });
});
