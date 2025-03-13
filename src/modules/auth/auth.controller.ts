/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import { Public } from '@/common/decorators/public.decorator';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { TokenDto } from './dtos/token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user.
   *
   * This endpoint allows new users to create an account.
   *
   * @param {RegisterDto} registerDto - DTO containing user registration details.
   * @returns {Observable<TokenDto>} The newly created user’s ID and email.
   *
   * @example
   * // Sample request body
   * {
   *   "firstName": "John",
   *   "name": "Doe",
   *   "email": "john.doe@example.com",
   *   "password": "SecureP@ss123"
   * }
   *
   * @throws {201} User registered successfully.
   * @throws {400} Bad request: Invalid input data.
   * @throws {409} Conflict: Email already in use.
   * @throws {500} Internal server error.
   */
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Authenticates a user and returns an access token.
   *
   * This endpoint allows users to log in using their credentials.
   *
   * @param req - The request object containing the authenticated user.
   * @returns {Observable<TokenDto>} An object containing the JWT access token.
   *
   * @example
   * // Sample request body
   * {
   *   "email": "user@example.com",
   *   "password": "SecureP@ss123"
   * }
   *
   * @throws {200} Login successful, returns access token.
   * @throws {401} Unauthorized: Invalid credentials.
   * @throws {500} Internal server error.
   */
  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req: ExpressRequest): Observable<TokenDto> {
    return this.authService.login(req.user);
  }

  /**
   * Logs out the current user.
   *
   * This endpoint allows users to log out and terminate their session.
   *
   * @param req - The request object containing the authenticated user session.
   * @returns {void} No content on successful logout.
   *
   * @throws {204} Logout successful.
   * @throws {401} Unauthorized: No active session.
   * @throws {500} Internal server error.
   */
  @Public()
  @Post('logout')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Request() req) {
    this.logger.log(`logout user ${req.user.emal}`);
    return req.logout();
  }

  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
