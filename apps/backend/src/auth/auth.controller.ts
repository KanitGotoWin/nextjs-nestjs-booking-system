import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'Login as admin and receive JWT in httpOnly cookie',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Admin successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(loginDto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600 * 1000,
    });

    return { message: 'Admin logged in' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout admin by clearing JWT cookie' })
  @ApiResponse({ status: 200, description: 'Admin successfully logged out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  logout(@Res({ passthrough: true }) res: Response): void {
    res.clearCookie('access_token');
  }
}
