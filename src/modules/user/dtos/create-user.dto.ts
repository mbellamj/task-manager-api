import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { UserDto } from '@/common/dtos/user.dto';

/**
 * Data Transfer Object (DTO) for user registration.
 * Ensures that all required fields are properly validated.
 */
export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {
  /**
   * The user's password.
   * Must be at least 8 characters long.
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
