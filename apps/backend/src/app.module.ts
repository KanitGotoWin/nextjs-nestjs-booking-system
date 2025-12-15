import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { BookingConfigsModule } from './booking-configs/booking-configs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BookingsModule,
    BookingConfigsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'postgres',
      database: 'booking',
      autoLoadEntities: true,
      synchronize: false, // ห้ามเปิด ❗
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
