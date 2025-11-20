import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateBookingConfigDto } from './dto/update-booking-config.dto';
import { BookingConfigsRepository } from './repositories/booking-configs.repository';
import { ServiceResponseBookingConfigDto } from './dto/service-response-booking-config.dto';

@Injectable()
export class BookingConfigsService {
  constructor(
    private readonly bookingConfigsRepository: BookingConfigsRepository,
  ) {}

  async getCapacity(): Promise<string> {
    const key: string = 'capacity';
    const value = await this.bookingConfigsRepository.getValueByKey(key);

    if (value === null) {
      throw new InternalServerErrorException(
        'Booking capacity configuration missing',
      );
    }

    return value;
  }

  async update(
    key: string,
    updateBookingConfigDto: UpdateBookingConfigDto,
  ): Promise<ServiceResponseBookingConfigDto> {
    const value = await this.bookingConfigsRepository.getValueByKey(key);

    if (value === null) {
      throw new InternalServerErrorException('Key not found');
    }

    return await this.bookingConfigsRepository.updateByKey(
      key,
      updateBookingConfigDto,
    );
  }
}
