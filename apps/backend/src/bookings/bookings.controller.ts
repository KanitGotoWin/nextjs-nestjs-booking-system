import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserResponseBookingDto } from './dto/user-response-booking.dto';
import { ListResponseBookingDto } from './dto/list-response-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiBody({ type: CreateBookingDto })
  @ApiCreatedResponse({
    type: UserResponseBookingDto,
    description: 'User booking created',
  })
  @ApiBadRequestResponse({
    description: '"Email" or "Name" is already booked (No case sensitive)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Booking capacity configuration missing',
  })
  @ApiConflictResponse({
    description: 'All ticket booked',
  })
  async create(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<UserResponseBookingDto> {
    const booking = await this.bookingsService.create(createBookingDto);

    return {
      message: `${booking.name} booked successfully!`,
    };
  }

  @Get()
  @ApiOkResponse({
    type: ListResponseBookingDto,
    description: 'List all bookings',
  })
  @ApiInternalServerErrorResponse({
    description: 'Booking capacity configuration missing',
  })
  async findAll(): Promise<ListResponseBookingDto> {
    return await this.bookingsService.findAll();
  }

  @Delete(':email')
  @ApiOkResponse({
    description: 'Booking cancel successfully',
    schema: {
      example: { message: 'Prasit cancelled, seats available again' },
    },
  })
  @ApiNotFoundResponse({
    description: 'Email not found',
    schema: {
      example: { message: 'Unable to cancel, email not found' },
    },
  })
  async remove(@Param('email') email: string) {
    return await this.bookingsService.remove(email);
  }
}
