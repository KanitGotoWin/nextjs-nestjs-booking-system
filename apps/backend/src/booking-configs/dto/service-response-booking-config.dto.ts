import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponseBookingConfigDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'capacity' })
  key: string;

  @ApiProperty({ example: '10' })
  value: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date(), nullable: true })
  updatedAt: Date | null;
}
