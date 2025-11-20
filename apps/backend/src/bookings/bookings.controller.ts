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
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UserResponseBookingDto } from './dto/user-response-booking.dto';
import { ListResponseBookingDto } from './dto/list-response-booking.dto';
import { DeleteResponseBookingDto } from './dto/delete-response-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new booking' })
  @ApiBody({ type: CreateBookingDto })
  @ApiCreatedResponse({
    type: UserResponseBookingDto,
    description: 'User booking created',
  })
  @ApiBadRequestResponse({
    description: 'Email or name is already booked OR validation failed',
    content: {
      'application/json': {
        examples: {
          emailExists: {
            summary: 'Email already booked',
            value: {
              statusCode: 400,
              message: 'Email is already booked.',
              error: 'Bad Request',
            },
          },
          nameExists: {
            summary: 'Name already booked',
            value: {
              statusCode: 400,
              message: 'Name is already booked.',
              error: 'Bad Request',
            },
          },
          invalidEmail: {
            summary: 'Invalid email format',
            value: {
              statusCode: 400,
              message: ['email must be an email'],
              error: 'Bad Request',
            },
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Booking capacity configuration missing',
    schema: {
      example: {
        message: 'Booking capacity configuration missing',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    },
  })
  @ApiConflictResponse({
    description: 'All ticket are booked',
    schema: {
      example: {
        message: 'All ticket are booked',
        error: 'Conflict',
        statusCode: 409,
      },
    },
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
  @ApiOperation({ summary: 'List all bookings with capacity info' })
  @ApiOkResponse({
    type: ListResponseBookingDto,
    description: 'List all bookings',
  })
  @ApiInternalServerErrorResponse({
    description: 'Booking capacity configuration missing',
    schema: {
      example: {
        message: 'Booking capacity configuration missing',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    },
  })
  async findAll(): Promise<ListResponseBookingDto> {
    return await this.bookingsService.findAll();
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Cancel a booking by email' })
  @ApiParam({
    name: 'email',
    type: String,
    description: 'Email to cancel booking',
  })
  @ApiOkResponse({
    type: DeleteResponseBookingDto,
    description: 'Booking cancel successfully',
  })
  @ApiNotFoundResponse({
    description: 'Email not found',
    schema: {
      example: {
        message: 'Unable to cancel, email not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  async remove(
    @Param('email') email: string,
  ): Promise<DeleteResponseBookingDto> {
    const name = await this.bookingsService.remove(email);

    return {
      message: `${name} cancelled, seats available again`,
    };
  }
}
