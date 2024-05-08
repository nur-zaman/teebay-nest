// // src/product/product.service.spec.ts

// import { Test, TestingModule } from '@nestjs/testing';
// import { ProductService } from './product.service';
// import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
// import { Product, RentStatus, RateType } from '../entities/product.entity';
// import { Category } from '../entities/category.entity';
// import { Purchase } from '../entities/purchase.entity';
// import { Rental } from '../entities/rental.entity';
// import { CreateProductDto } from './dto/create-product.dto';

// describe('ProductService', () => {
//   let service: ProductService;
//   let entityManager: EntityManager;
//   let productRepository: EntityRepository<Product>;
//   let categoryRepository: EntityRepository<Category>;
//   let purchaseRepository: EntityRepository<Purchase>;
//   let rentalRepository: EntityRepository<Rental>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProductService,
//         {
//           provide: EntityManager,
//           useValue: {
//             // Mock EntityManager methods as needed
//             persistAndFlush: jest.fn(),
//             transactional: jest.fn((fn) => fn()), // Assuming transactional calls always succeed
//             removeAndFlush: jest.fn(),
//           },
//         },
//         {
//           provide: EntityRepository<Product>,
//           useValue: {
//             // Mock productRepository methods as needed
//             create: jest.fn(),
//             findOne: jest.fn(),
//             createQueryBuilder: jest.fn(() => ({
//               // Mock query builder methods as needed
//               andWhere: jest.fn().mockReturnThis(),
//               leftJoinAndSelect: jest.fn().mockReturnThis(),
//               getResult: jest.fn(),
//             })),
//           },
//         },
//         {
//           provide: EntityRepository<Category>,
//           useValue: {
//             // Mock categoryRepository methods as needed
//             findOne: jest.fn(),
//             create: jest.fn(),
//           },
//         },
//         {
//           provide: EntityRepository<Purchase>,
//           useValue: {
//             // Mock purchaseRepository methods as needed
//             create: jest.fn(),
//           },
//         },
//         {
//           provide: EntityRepository<Rental>,
//           useValue: {
//             // Mock rentalRepository methods as needed
//             findOne: jest.fn(),
//             create: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<ProductService>(ProductService);
//     entityManager = module.get<EntityManager>(EntityManager);
//     productRepository = module.get<EntityRepository<Product>>(
//       EntityRepository<Product>,
//     );
//     categoryRepository = module.get<EntityRepository<Category>>(
//       EntityRepository<Category>,
//     );
//     purchaseRepository = module.get<EntityRepository<Purchase>>(
//       EntityRepository<Purchase>,
//     );
//     rentalRepository = module.get<EntityRepository<Rental>>(
//       EntityRepository<Rental>,
//     );
//   });

//   describe('create', () => {
//     it('should create a product with categories', async () => {
//       const createProductDto: CreateProductDto = {
//         title: 'Test Product',
//         description: 'This is a test product',
//         price: 100,
//         rent: 10,
//         rate: RateType.DAY,
//         userId: 'test-user-id',
//         categories: ['Electronics', 'New'],
//       };

//       const mockCategoryRepository = {
//         findOne: jest.fn().mockResolvedValue(null),
//         create: jest.fn(),
//       };

//       // Inject mocks into ProductService
//       service = new ProductService(
//         entityManager,
//         productRepository,
//         mockCategoryRepository as any,
//         rentalRepository,
//         purchaseRepository,
//       );

//       const result = await service.create(createProductDto);

//       expect(result).toBeInstanceOf(Product);
//       expect(result.title).toBe(createProductDto.title);
//       expect(result.categories.getItems()).toHaveLength(2);

//       expect(mockCategoryRepository.findOne).toHaveBeenCalledTimes(2);
//       expect(mockCategoryRepository.create).toHaveBeenCalledTimes(2);
//     });
//   });

//   // ... (other test cases)
// });
