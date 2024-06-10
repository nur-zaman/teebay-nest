// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User])], // Register User entity
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
