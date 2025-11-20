import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseBookingDto {
  @ApiProperty({ example: 'Prasit cancelled, seats available again' })
  message: string;
}
