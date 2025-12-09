import { Module } from '@nestjs/common';
import { BookingConfigsService } from './booking-configs.service';
import { BookingConfigsController } from './booking-configs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookingConfigsRepository } from './repositories/booking-configs.repository';

@Module({
  imports: [PrismaModule],
  controllers: [BookingConfigsController],
  providers: [BookingConfigsService, BookingConfigsRepository],
  exports: [BookingConfigsRepository],
})
export class BookingConfigsModule {}
