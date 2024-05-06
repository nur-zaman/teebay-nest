import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.em.persistAndFlush(user);
    return user;
  }

  async signin(loginDto: LoginDto): Promise<User | null> {
    const email = loginDto.email;
    const password = loginDto.password;
    const user = await this.userRepository.findOne({ email });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
