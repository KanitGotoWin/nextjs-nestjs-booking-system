import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const mockUserRepository = {
  findByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService - Unit test', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  // ----------------------------------------
  // login()
  // ----------------------------------------
  describe('login()', () => {
    const loginDto = { email: 'admin@test.com', password: 'password123' };
    const mockUser = {
      id: 1,
      name: 'Admin',
      email: 'admin@test.com',
      password: 'hashedPassword',
    };

    it('should throw UnauthorizedException if user not found', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        loginDto.email,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt as any, 'compare').mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password,
      );
    });

    it('should return accessToken if credentials are valid', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt as any, 'compare').mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('mockedToken');

      const result = await service.login(loginDto);

      expect(result).toEqual({ accessToken: 'mockedToken' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      });
    });
  });
});
