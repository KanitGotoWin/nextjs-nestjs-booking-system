import { Injectable } from '@nestjs/common';
import { Booking, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BookingCreateInput): Promise<Booking> {
    return await this.prisma.booking.create({ data });
  }

  async findAll(): Promise<Booking[]> {
    return await this.prisma.booking.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: number): Promise<Booking | null> {
    return await this.prisma.booking.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Booking | null> {
    return await this.prisma.booking.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async findByName(name: string): Promise<Booking | null> {
    return await this.prisma.booking.findUnique({
      where: { name, deletedAt: null },
    });
  }

  async remove(email: string) {
    return await this.prisma.booking.delete({
      where: { email },
    });
  }

  async softDelete(email: string): Promise<void> {
    await this.prisma.booking.update({
      where: { email, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }

  async countBooking(): Promise<number> {
    return await this.prisma.booking.count({
      where: { deletedAt: null },
    });
  }
}
