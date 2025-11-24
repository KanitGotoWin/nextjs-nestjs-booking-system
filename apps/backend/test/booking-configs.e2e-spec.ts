import dotenv from 'dotenv';
dotenv.config({ path: '.env.test', override: true });

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import request from 'supertest';
import { App } from 'supertest/types';

describe('BookingConfigs E2E', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.bookingConfig.deleteMany();
    await prisma.bookingConfig.create({
      data: { key: 'capacity', value: '10' },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /booking-configs', () => {
    it('should return current capacity', async () => {
      const response = await request(app.getHttpServer())
        .get('/booking-configs')
        .expect(200);

      expect(response.text).toBe('10');
    });

    it('should return error when capacity missing', async () => {
      await prisma.bookingConfig.deleteMany();

      const response = await request(app.getHttpServer())
        .get('/booking-configs')
        .expect(500);

      expect(response.body).toEqual({
        statusCode: 500,
        message: 'Booking capacity configuration missing',
        error: 'Internal Server Error',
      });

      await prisma.bookingConfig.create({
        data: {
          key: 'capacity',
          value: '10',
        },
      });
    });
  });

  describe('PATCH /booking-configs/:key', () => {
    it('should update existing key', async () => {
      const dto = { value: '50' };

      const response = await request(app.getHttpServer())
        .patch('/booking-configs/capacity')
        .send(dto)
        .expect(200);

      expect(response.body).toMatchObject({
        key: 'capacity',
        value: dto?.value,
      });

      const updated = await prisma.bookingConfig.findUnique({
        where: { key: 'capacity' },
      });

      expect(updated?.value).toBe(dto?.value);
    });

    it('should return error when key does not exist', async () => {
      const response = await request(app.getHttpServer())
        .patch('/booking-configs/unknown')
        .send({ value: '999' })
        .expect(500);

      expect(response.body).toEqual({
        statusCode: 500,
        message: 'Key not found',
        error: 'Internal Server Error',
      });
    });
  });
});
