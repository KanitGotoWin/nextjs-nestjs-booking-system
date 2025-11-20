import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingsRepository } from './repositories/booking.repository';
import { BookingConfigsRepository } from 'src/booking-configs/repositories/booking-configs.repository';
import { ServiceResponseBookingDto } from './dto/service-reponse-booking.dto';
import { ListResponseBookingDto } from './dto/list-response-booking.dto';
import { BookingItemDto } from './dto/booking-item.dto';
import { ListResponseBookingStatus } from './dto/list-response-booking-status';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly bookingConfigsRepository: BookingConfigsRepository,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
  ): Promise<ServiceResponseBookingDto> {
    const [existingEmail, existingName] = await Promise.all([
      this.bookingsRepository.findByEmail(createBookingDto.email),
      this.bookingsRepository.findByName(createBookingDto.name),
    ]);

    if (existingEmail)
      throw new BadRequestException('Email is already booked.');
    if (existingName) throw new BadRequestException('Name is already booked.');

    const maxCapacity =
      await this.bookingConfigsRepository.getValueByKey('capacity');
    const bookingCount = await this.bookingsRepository.countBooking();

    if (maxCapacity === null) {
      throw new InternalServerErrorException(
        'Booking capacity configuration missing.',
      );
    }

    if (bookingCount >= +maxCapacity) {
      throw new ConflictException('All ticket are booked.');
    }

    return await this.bookingsRepository.create(createBookingDto);
  }

  async findAll(): Promise<ListResponseBookingDto> {
    const bookings = await this.bookingsRepository.findAll();

    const bookingItems: BookingItemDto[] = bookings.map((item) => ({
      name: item.name,
      email: item.email,
    }));

    const maxCapacity =
      await this.bookingConfigsRepository.getValueByKey('capacity');

    if (maxCapacity === null) {
      throw new InternalServerErrorException(
        'Booking capacity configuration missing.',
      );
    }

    const availableSeats = +maxCapacity - bookings.length;
    const status =
      availableSeats > 0
        ? ListResponseBookingStatus.AVAILABLE
        : ListResponseBookingStatus.FULL;

    return {
      bookings: bookingItems,
      availableSeats: availableSeats,
      status: status,
    };
  }

  async remove(email: string): Promise<void> {
    const existingEmail = await this.bookingsRepository.findByEmail(email);

    if (!existingEmail) {
      throw new NotFoundException('Unable to cancel, email not found.');
    }

    return await this.bookingsRepository.softDelete(email);
  }
}
