import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBookingConfigDto {
  @ApiProperty({ example: '10' })
  @IsString()
  @IsNotEmpty()
  value: string;
}
