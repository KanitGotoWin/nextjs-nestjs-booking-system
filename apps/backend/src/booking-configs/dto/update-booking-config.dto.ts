import { PartialType } from '@nestjs/swagger';
import { CreateBookingConfigDto } from './create-booking-config.dto';

export class UpdateBookingConfigDto extends PartialType(CreateBookingConfigDto) {}
