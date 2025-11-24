import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

const mockAuthService = {
  login: jest.fn(),
};

let mockResponse: {
  cookie: () => void;
  clearCookie: () => void;
};

describe('AuthController - Unit test', () => {
  let controller: AuthController;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockResponse = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login()', () => {
    it('should call authService.login with DTO and set cookie', async () => {
      const mockAccessToken = 'token_test';
      const dto = { email: 'admin@test.com', password: '1234' };
      const fakeToken = { accessToken: mockAccessToken };
      mockAuthService.login.mockResolvedValue(fakeToken);

      const result = await controller.login(
        dto,
        mockResponse as unknown as Response,
      );

      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        mockAccessToken,
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
        }),
      );
      expect(result).toEqual({ message: 'Admin logged in' });
    });
  });

  describe('logout()', () => {
    it('should clear cookie', async () => {
      await controller.logout(mockResponse as unknown as Response);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith('access_token');
    });
  });
});
