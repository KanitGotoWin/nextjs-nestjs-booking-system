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
import { BookingsGateway } from './bookings.gateway';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly bookingConfigsRepository: BookingConfigsRepository,
    private readonly bookingsGateway: BookingsGateway,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
  ): Promise<ServiceResponseBookingDto> {
    const [existingEmail, existingName] = await Promise.all([
      this.bookingsRepository.findByEmail(createBookingDto.email),
      this.bookingsRepository.findByName(createBookingDto.name),
    ]);

    if (existingEmail) throw new BadRequestException('Email is already booked');
    if (existingName) throw new BadRequestException('Name is already booked');

    const maxCapacityStr =
      await this.bookingConfigsRepository.getValueByKey('capacity');

    if (maxCapacityStr === null) {
      throw new InternalServerErrorException(
        'Booking capacity configuration missing.',
      );
    }

    const maxCapacity = Number(maxCapacityStr);
    const bookingCount = await this.bookingsRepository.countBooking();

    if (bookingCount >= maxCapacity) {
      throw new ConflictException('All ticket are booked');
    }

    const booking = await this.bookingsRepository.create(createBookingDto);
    const updatedCount = await this.bookingsRepository.countBooking();
    this.bookingsGateway.reRenderBookings();

    //Notify if full after booked (แจ้งเตือนเต็ม)
    if (updatedCount >= maxCapacity) {
      this.bookingsGateway.notifyFull();
    }

    return booking;
  }

  async findAll(): Promise<ListResponseBookingDto> {
    const bookings = await this.bookingsRepository.findAll();

    const bookingItems: BookingItemDto[] = bookings.map((item) => ({
      name: item.name,
      email: item.email,
      createdAt: item.createdAt,
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

  async remove(email: string): Promise<string> {
    const existingBooking = await this.bookingsRepository.findByEmail(email);

    if (!existingBooking) {
      throw new NotFoundException('Unable to cancel, email not found');
    }

    await this.bookingsRepository.remove(email);

    this.bookingsGateway.reRenderBookings();

    const maxCapacityStr =
      await this.bookingConfigsRepository.getValueByKey('capacity');

    if (maxCapacityStr === null) {
      return existingBooking.name;
    }

    const maxCapacity = Number(maxCapacityStr);
    const notifyCapacity = maxCapacity - 1;
    const countBooking = await this.bookingsRepository.countBooking();

    //Notify if booking is canceled previously (แจ้งเตือนว่าง หากก่อนหน้านี้เต็ม)
    if (countBooking === notifyCapacity) {
      this.bookingsGateway.notifyAvailable();
    }

    return existingBooking.name;
  }
}
