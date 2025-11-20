import { Injectable } from '@nestjs/common';
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
}
