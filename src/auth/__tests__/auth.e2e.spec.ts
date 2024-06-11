import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { CreateUserDto } from '../../../src/auth/dto/create-user.dto';
import { LoginDto } from '../../../src/auth/dto/login.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const randomEmail = Math.random().toString(36).substring(2) + '@test.com';
  it('/api/signup (POST)', async () => {
    const createUserDto: CreateUserDto = {
      email: randomEmail,
      password: 'testpassword',
      firstName: 'one',
      lastName: 'one',
    };

    const response = await request(app.getHttpServer())
      .post('/signup')
      .send(createUserDto)
      .expect(201);

    const { id, email } = response.body;
    expect(id).toBeDefined();
    expect(email).toBe(createUserDto.email);
  });

  it('/api/signin (POST)', async () => {
    const loginDto: LoginDto = {
      email: randomEmail,
      password: 'testpassword',
    };

    const response = await request(app.getHttpServer())
      .post('/signin')
      .send(loginDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });

  it('/api/signin (POST) Unauthorized', async () => {
    const loginDto: LoginDto = {
      email: randomEmail,
      password: 'wrongtestpassword',
    };

    const response = await request(app.getHttpServer())
      .post('/signin')
      .send(loginDto)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toHaveProperty('statusCode', HttpStatus.UNAUTHORIZED);
  });
});
