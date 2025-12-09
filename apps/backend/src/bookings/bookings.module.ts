import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookingsRepository } from './repositories/bookings.repository';
import { BookingsGateway } from './bookings.gateway';
import { BookingConfigsModule } from 'src/booking-configs/booking-configs.module';

@Module({
  imports: [PrismaModule, BookingConfigsModule],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository, BookingsGateway],
})
export class BookingsModule {}
