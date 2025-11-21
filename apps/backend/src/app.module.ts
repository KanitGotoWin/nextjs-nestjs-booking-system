import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { BookingConfigsModule } from './booking-configs/booking-configs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BookingsModule, BookingConfigsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
