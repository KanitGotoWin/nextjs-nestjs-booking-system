import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookingsRepository } from './repositories/booking.repository';
import { BookingConfigsRepository } from 'src/booking-configs/repositories/booking-configs.repository';
import { BookingsGateway } from './bookings.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [BookingsController],
  providers: [
    BookingsService,
    BookingsRepository,
    BookingConfigsRepository,
    BookingsGateway,
  ],
})
export class BookingsModule {}
