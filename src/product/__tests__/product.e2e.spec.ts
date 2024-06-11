import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { CreateProductDto } from '../../../src/product/dto/create-product.dto';
import { UpdateProductDto } from '../../../src/product/dto/update-product.dto';
import { BuyProductDto } from '../../../src/product/dto/buy-product.dto';
import { RentProductDto } from '../../../src/product/dto/rent-product.dto';
import { RateType } from '../../../src/entities/product.entity';
import { CreateUserDto } from '../../../src/auth/dto/create-user.dto';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let createdProductId: string;
  let createdProductId1: string;
  let createdProductId2: string;
  let createdUserId: string;
  const randomEmail = Math.random().toString(36).substring(2) + '@test.com';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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

    const { id } = response.body;
    createdUserId = id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/product (POST) - create product', async () => {
    const createProductDto: CreateProductDto = {
      title: 'Test Product',
      description: 'A test product',
      price: 100,
      rent: 50,
      rate: RateType.DAY,
      userId: createdUserId,
      categories: ['Electronics'],
    };
    const response = await request(app.getHttpServer())
      .post('/product')
      .send(createProductDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title', createProductDto.title);
    createdProductId = response.body.id;
  });

  it('/product (POST) - create product with multiple categories', async () => {
    const createProductDto: CreateProductDto = {
      title: 'Test Product',
      description: 'A test product',
      price: 100,
      rent: 50,
      rate: RateType.DAY,
      userId: createdUserId,
      categories: ['Electronics', 'Furniture'],
    };
    const response = await request(app.getHttpServer())
      .post('/product')
      .send(createProductDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title', createProductDto.title);
    createdProductId1 = response.body.id;
  });
  it('/product (POST) - create product with no category', async () => {
    const createProductDto: CreateProductDto = {
      title: 'Test Product',
      description: 'A test product',
      price: 100,
      rent: 50,
      rate: RateType.DAY,
      userId: createdUserId,
      categories: [],
    };
    const response = await request(app.getHttpServer())
      .post('/product')
      .send(createProductDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title', createProductDto.title);
    createdProductId2 = response.body.id;
  });

  it('/product (GET) - get all products', async () => {
    const response = await request(app.getHttpServer())
      .get('/product')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/product/:id (GET) - get product by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/product/${createdProductId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdProductId);
  });

  it('/product/:id (PATCH) - update product by id', async () => {
    const updateProductDto: UpdateProductDto = {
      title: 'Test Product Updated Title',
      description: 'A test product',
      price: 100,
      rent: 50,
      rate: RateType.DAY,
      categories: [],
    };
    const response = await request(app.getHttpServer())
      .patch(`/product/${createdProductId}`)
      .send(updateProductDto)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdProductId);
    expect(response.body).toHaveProperty('title', updateProductDto.title);
  });

  it('/product/buy (POST) - buy product', async () => {
    const buyProductDto: BuyProductDto = {
      userId: createdUserId,
      productId: createdProductId,
    };

    const response = await request(app.getHttpServer())
      .post('/product/buy')
      .send(buyProductDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('userId', buyProductDto.userId);
  });

  it('/product/rent (POST) - rent product', async () => {
    const rentProductDto: RentProductDto = {
      userId: createdUserId,
      productId: createdProductId1,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000), // +1 day
    };

    const response = await request(app.getHttpServer())
      .post('/product/rent')
      .send(rentProductDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
  });
  it('/product/:id (DELETE) - delete product by id', async () => {
    await request(app.getHttpServer())
      .delete(`/product/${createdProductId2}`)
      .expect(200);
  });
});
