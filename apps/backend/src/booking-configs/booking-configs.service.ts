import { Injectable } from '@nestjs/common';
import { CreateBookingConfigDto } from './dto/create-booking-config.dto';
import { UpdateBookingConfigDto } from './dto/update-booking-config.dto';

@Injectable()
export class BookingConfigsService {
  create(createBookingConfigDto: CreateBookingConfigDto) {
    return 'This action adds a new bookingConfig';
  }

  findAll() {
    return `This action returns all bookingConfigs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingConfig`;
  }

  update(id: number, updateBookingConfigDto: UpdateBookingConfigDto) {
    return `This action updates a #${id} bookingConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingConfig`;
  }
}
