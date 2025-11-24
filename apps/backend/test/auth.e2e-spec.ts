import dotenv from 'dotenv';
dotenv.config({ path: '.env.test', override: true });

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { App } from 'supertest/types';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'admin1234';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) - success', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .expect(200);

    expect(res.body).toEqual({ message: 'Admin logged in' });

    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain('access_token=');
  });

  it('/auth/login (POST) - fail', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' })
      .expect(401);
  });

  it('/auth/logout (POST) - success', async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .expect(200);

    const cookie = login.headers['set-cookie'];

    const logout = await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Cookie', cookie)
      .expect(204);

    expect(logout.headers['set-cookie'][0]).toContain('access_token=;');
  });
});
