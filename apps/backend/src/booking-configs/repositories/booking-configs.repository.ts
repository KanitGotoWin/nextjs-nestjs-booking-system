import { Injectable } from '@nestjs/common';
import { BookingConfig, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingConfigsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getValueByKey(key: string): Promise<string | null> {
    const config = await this.prisma.bookingConfig.findUnique({
      where: { key },
    });

    return config?.value ?? null;
  }

  async updateByKey(
    key: string,
    data: Prisma.BookingConfigUpdateInput,
  ): Promise<BookingConfig> {
    return await this.prisma.bookingConfig.update({
      where: { key },
      data: data,
    });
  }
}
