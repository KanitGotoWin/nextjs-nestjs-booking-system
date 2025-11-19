import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookingsModule } from './bookings/bookings.module';
import { BookingConfigsModule } from './booking-configs/booking-configs.module';

@Module({
  imports: [UserModule, BookingsModule, BookingConfigsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
