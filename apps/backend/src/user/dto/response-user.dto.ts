import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Prasit Pompiram' })
  name: string;

  @ApiProperty({ example: 'Prasit@gmail.com' })
  email: string;

  createdAt: Date;
}