import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserResponseBookingDto } from './dto/user-response-booking.dto';
import { ListResponseBookingDto } from './dto/list-response-booking.dto';
import { DeleteResponseBookingDto } from './dto/delete-response-booking.dto';
import { ListResponseBookingStatus } from './dto/list-response-booking-status';

const mockBookingsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
};

describe('BookingsController - Unit test', () => {
  let controller: BookingsController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsController,
        {
          provide: BookingsService,
          useValue: mockBookingsService,
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ---------------------------------------------------------
  // create()
  // ---------------------------------------------------------
  describe('create()', () => {
    const dto: CreateBookingDto = {
      name: 'Prasit',
      email: 'prasit@gmail.com',
    };

    it('should return success message when booking is created', async () => {
      mockBookingsService.create.mockResolvedValue({
        name: dto.name,
        email: dto.email,
      });

      const result = await controller.create(dto);

      expect(result).toEqual<UserResponseBookingDto>({
        message: `${dto.name} booked successfully!`,
      });

      expect(mockBookingsService.create).toHaveBeenCalledWith(dto);
    });

    it('should return BadRequestException from service', async () => {
      mockBookingsService.create.mockRejectedValue(
        new BadRequestException('Email is already booked'),
      );

      await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should return InternalServerErrorException from service', async () => {
      mockBookingsService.create.mockRejectedValue(
        new InternalServerErrorException('Capacity config missing'),
      );

      await expect(controller.create(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should return ConflictException from service', async () => {
      mockBookingsService.create.mockRejectedValue(
        new ConflictException('All tickets booked'),
      );

      await expect(controller.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  // ---------------------------------------------------------
  // findAll()
  // ---------------------------------------------------------
  describe('findAll()', () => {
    it('should return all bookings with available seats and status', async () => {
      const mockResponse: ListResponseBookingDto = {
        bookings: [
          {
            name: 'Alice',
            email: 'alice@example.com',
          },
        ],
        availableSeats: 8,
        status: ListResponseBookingStatus.AVAILABLE,
      };

      mockBookingsService.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll();

      expect(result).toEqual(mockResponse);
      expect(mockBookingsService.findAll).toHaveBeenCalled();
    });

    it('should return InternalServerErrorException from service', async () => {
      mockBookingsService.findAll.mockRejectedValue(
        new InternalServerErrorException('Capacity config missing'),
      );

      await expect(controller.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // ---------------------------------------------------------
  // remove()
  // ---------------------------------------------------------
  describe('remove()', () => {
    const email = 'prasit@gmail.com';

    it('should return success message when booking is cancelled', async () => {
      mockBookingsService.remove.mockResolvedValue('Prasit');

      const result = await controller.remove(email);

      expect(result).toEqual<DeleteResponseBookingDto>({
        message: 'Prasit cancelled, seats available again',
      });

      expect(mockBookingsService.remove).toHaveBeenCalledWith(email);
    });

    it('should return NotFoundException from service', async () => {
      mockBookingsService.remove.mockRejectedValue(
        new NotFoundException('Unable to cancel, email not found'),
      );

      await expect(controller.remove(email)).rejects.toThrow(NotFoundException);
    });
  });
});
