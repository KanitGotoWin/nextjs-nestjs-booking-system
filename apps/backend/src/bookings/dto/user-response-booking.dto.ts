import { ApiProperty } from '@nestjs/swagger';

export class UserResponseBookingDto {
  @ApiProperty({ example: 'Prasit booked successfully' })
  message: string;
}
