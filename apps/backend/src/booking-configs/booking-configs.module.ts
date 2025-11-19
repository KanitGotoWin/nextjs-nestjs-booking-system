import { Module } from '@nestjs/common';
import { BookingConfigsService } from './booking-configs.service';
import { BookingConfigsController } from './booking-configs.controller';

@Module({
  controllers: [BookingConfigsController],
  providers: [BookingConfigsService],
})
export class BookingConfigsModule {}
