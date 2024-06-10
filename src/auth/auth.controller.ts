import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { wrap } from '@mikro-orm/core';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ description: 'User registration' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const signupResponse = await this.authService.signup(createUserDto);

    return wrap(signupResponse).serialize({
      populate: [],
      exclude: [
        'firstName',
        'lastName',
        'phone',
        'password',
        'products',
        'rentals',
        'purchases',
        'address',
      ],
      forceObject: true,
      skipNull: true,
    });
  }

  @ApiOkResponse({ description: 'User login' })
  @Post('signin')
  async login(@Body() loginDto: LoginDto) {
    // return this.authService.signin(loginDto);
    return wrap(await this.authService.signin(loginDto)).serialize({
      populate: [],
      exclude: [
        'firstName',
        'lastName',
        'phone',
        'password',
        'products',
        'rentals',
        'purchases',
        'address',
      ],
      forceObject: true,
      skipNull: true,
    });
  }
}
