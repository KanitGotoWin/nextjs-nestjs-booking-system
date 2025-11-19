import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookingsModule } from './bookings/bookings.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [UserModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
