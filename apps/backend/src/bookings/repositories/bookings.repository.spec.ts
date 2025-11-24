import { Test, TestingModule } from '@nestjs/testing';
import { BookingsRepository } from './bookings.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Booking, Prisma } from '@prisma/client';

describe('BookingsRepository - Unit test', () => {
  let repository: BookingsRepository;

  const mockPrisma = {
    booking: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsRepository,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    repository = module.get<BookingsRepository>(BookingsRepository);
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  // ----------------------------------------
  // create()
  // ----------------------------------------
  describe('create()', () => {
    it('should call prisma.booking.create and return Booking', async () => {
      const data: Prisma.BookingCreateInput = {
        name: 'Alice',
        email: 'a@b.com',
      };
      const booking: Booking = {
        id: 1,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      mockPrisma.booking.create.mockResolvedValue(booking);

      const result = await repository.create(data);

      expect(result).toEqual(booking);
      expect(mockPrisma.booking.create).toHaveBeenCalledWith({ data });
    });
  });

  // ----------------------------------------
  // findAll()
  // ----------------------------------------
  describe('findAll()', () => {
    it('should call prisma.booking.findMany and return array', async () => {
      const bookings: Booking[] = [
        {
          id: 1,
          name: 'A',
          email: 'a@b.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      mockPrisma.booking.findMany.mockResolvedValue(bookings);

      const result = await repository.findAll();

      expect(result).toEqual(bookings);
      expect(mockPrisma.booking.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
      });
    });
  });

  // ----------------------------------------
  // findOne()
  // ----------------------------------------
  describe('findOne()', () => {
    it('should return booking by id', async () => {
      const booking: Booking = {
        id: 1,
        name: 'A',
        email: 'a@b.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      mockPrisma.booking.findFirst.mockResolvedValue(booking);

      const result = await repository.findOne(1);

      expect(result).toEqual(booking);
      expect(mockPrisma.booking.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  // ----------------------------------------
  // findByEmail()
  // ----------------------------------------
  describe('findByEmail()', () => {
    it('should return booking by email', async () => {
      const booking: Booking = {
        id: 1,
        name: 'A',
        email: 'a@b.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      mockPrisma.booking.findUnique.mockResolvedValue(booking);

      const result = await repository.findByEmail('a@b.com');

      expect(result).toEqual(booking);
      expect(mockPrisma.booking.findUnique).toHaveBeenCalledWith({
        where: { email: 'a@b.com', deletedAt: null },
      });
    });
  });

  // ----------------------------------------
  // findByName()
  // ----------------------------------------
  describe('findByName()', () => {
    it('should return booking by name', async () => {
      const booking: Booking = {
        id: 1,
        name: 'A',
        email: 'a@b.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      mockPrisma.booking.findUnique.mockResolvedValue(booking);

      const result = await repository.findByName('A');

      expect(result).toEqual(booking);
      expect(mockPrisma.booking.findUnique).toHaveBeenCalledWith({
        where: { name: 'A', deletedAt: null },
      });
    });
  });

  // ----------------------------------------
  // remove()
  // ----------------------------------------
  describe('remove()', () => {
    it('should call prisma.booking.delete with email', async () => {
      const booking: Booking = {
        id: 1,
        name: 'A',
        email: 'a@b.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      mockPrisma.booking.delete.mockResolvedValue(booking);

      const result = await repository.remove('a@b.com');

      expect(result).toEqual(booking);
      expect(mockPrisma.booking.delete).toHaveBeenCalledWith({
        where: { email: 'a@b.com' },
      });
    });
  });

  // ----------------------------------------
  // softDelete()
  // ----------------------------------------
  describe('softDelete()', () => {
    it('should call prisma.booking.update with deletedAt', async () => {
      mockPrisma.booking.update.mockResolvedValue(undefined);

      await repository.softDelete('a@b.com');

      expect(mockPrisma.booking.update).toHaveBeenCalledWith({
        where: { email: 'a@b.com', deletedAt: null },
        data: { deletedAt: expect.any(Date) as unknown as Date },
      });
    });
  });

  // ----------------------------------------
  // countBooking()
  // ----------------------------------------
  describe('countBooking()', () => {
    it('should return number of bookings', async () => {
      mockPrisma.booking.count.mockResolvedValue(5);

      const result = await repository.countBooking();

      expect(result).toBe(5);
      expect(mockPrisma.booking.count).toHaveBeenCalledWith({
        where: { deletedAt: null },
      });
    });
  });
});
