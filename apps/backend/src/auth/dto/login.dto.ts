import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Admin username', example: 'test@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Admin password', example: 'password123' })
  password: string;
}
