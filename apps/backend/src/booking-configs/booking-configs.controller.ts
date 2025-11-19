import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingConfigsService } from './booking-configs.service';
import { CreateBookingConfigDto } from './dto/create-booking-config.dto';
import { UpdateBookingConfigDto } from './dto/update-booking-config.dto';

@Controller('booking-configs')
export class BookingConfigsController {
  constructor(private readonly bookingConfigsService: BookingConfigsService) {}

  @Post()
  create(@Body() createBookingConfigDto: CreateBookingConfigDto) {
    return this.bookingConfigsService.create(createBookingConfigDto);
  }

  @Get()
  findAll() {
    return this.bookingConfigsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingConfigsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingConfigDto: UpdateBookingConfigDto) {
    return this.bookingConfigsService.update(+id, updateBookingConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingConfigsService.remove(+id);
  }
}
