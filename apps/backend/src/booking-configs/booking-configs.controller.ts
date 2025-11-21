import { Controller, Body, Patch, Param, Get } from '@nestjs/common';
import { BookingConfigsService } from './booking-configs.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateBookingConfigDto } from './dto/update-booking-config.dto';
import { ServiceResponseBookingConfigDto } from './dto/service-response-booking-config.dto';

@Controller('booking-configs')
export class BookingConfigsController {
  constructor(private readonly bookingConfigsService: BookingConfigsService) {}
  @Get()
  @ApiOperation({ summary: 'Get capacity value' })
  @ApiOkResponse({
    description: 'Get current booking capacity value',
    schema: {
      type: 'string',
      example: '100',
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
  async getCapacity(): Promise<string> {
    return await this.bookingConfigsService.getCapacity();
  }

  @Patch(':key')
  @ApiParam({
    name: 'key',
    type: String,
    description: 'Key to update',
  })
  @ApiOperation({ summary: 'Update config value by key' })
  @ApiOkResponse({
    type: ServiceResponseBookingConfigDto,
    description: 'Value of the request key updated',
    schema: {},
  })
  @ApiInternalServerErrorResponse({
    description: 'Key not found',
    schema: {
      example: {
        message: 'Key not found',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    },
  })
  async update(
    @Param('key') key: string,
    @Body() updateBookingConfigDto: UpdateBookingConfigDto,
  ): Promise<ServiceResponseBookingConfigDto> {
    return await this.bookingConfigsService.update(key, updateBookingConfigDto);
  }
}
