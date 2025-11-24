import dotenv from 'dotenv';
dotenv.config({ path: '.env.test', override: true });

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { App } from 'supertest/types';
import { ListResponseBookingDto } from 'src/bookings/dto/list-response-booking.dto';

describe('Bookings (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  const bookingDto = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.booking.deleteMany();
    await prisma.bookingConfig.deleteMany();
    await prisma.bookingConfig.create({
      data: { key: 'capacity', value: '10' },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  async function setCapacity(value: string) {
    await prisma.bookingConfig.update({
      where: { key: 'capacity' },
      data: { value },
    });

    console.log(`set capacity to ${value}`);
  }

  describe('POST /bookings', () => {
    it('should create a booking successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/bookings')
        .send(bookingDto)
        .expect(201);

      expect(response.body).toHaveProperty(
        'message',
        `${bookingDto.name} booked successfully!`,
      );
    });

    it('should fail if email is already booked', async () => {
      const response = await request(app.getHttpServer())
        .post('/bookings')
        .send({ ...bookingDto, name: 'Jane Doe' })
        .expect(400);

      expect(response.body).toHaveProperty(
        'message',
        'Email is already booked',
      );
    });

    it('should fail if name is already booked', async () => {
      const response = await request(app.getHttpServer())
        .post('/bookings')
        .send({ ...bookingDto, email: 'new.email@example.com' })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Name is already booked');
    });

    it('should fail if all tickets are booked', async () => {
      // set capacity for for last ticket (need 2 because it was booked by John Doe)
      await setCapacity('2');

      // book the only available ticket
      await request(app.getHttpServer())
        .post('/bookings')
        .send({ name: 'Alice', email: 'alice@example.com' })
        .expect(201);

      // attempt to book when no tickets are left
      const response = await request(app.getHttpServer())
        .post('/bookings')
        .send({ name: 'Bob', email: 'bob@example.com' })
        .expect(409);

      expect(response.body).toHaveProperty('message', 'All ticket are booked');
    });
  });

  describe('GET /bookings', () => {
    it('should list all bookings with capacity info', async () => {
      const response = await request(app.getHttpServer())
        .get('/bookings')
        .expect(200);

      const body = response.body as ListResponseBookingDto;

      expect(response.body).toHaveProperty('bookings');
      expect(Array.isArray(body.bookings)).toBe(true);
      expect(typeof body.availableSeats).toBe('number');
      expect(typeof body.status).toBe('string');
    });
  });

  describe('DELETE /bookings/:email', () => {
    it('should cancel a booking successfully', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/bookings/${bookingDto.email}`)
        .expect(200);

      expect(response.body).toHaveProperty(
        'message',
        `${bookingDto.name} cancelled, seats available again`,
      );
    });

    it('should fail if email not found', async () => {
      const response = await request(app.getHttpServer())
        .delete('/bookings/notfound@example.com')
        .expect(404);

      expect(response.body).toHaveProperty(
        'message',
        'Unable to cancel, email not found',
      );
    });
  });
});
