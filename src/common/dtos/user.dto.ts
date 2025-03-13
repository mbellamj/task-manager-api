import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';

/**
 * Data Transfer Object (DTO) for user object.
 * Ensures that all required fields are properly validated.
 */
export class UserDto {
  /**
   * The user's unique identifier.
   * Must be a non-empty string.
   */
  @IsNotEmpty()
  @IsUUID()
  id: string;

  /**
   * The user's name.
   * Must be a non-empty string.
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * The user's first name.
   * Must be a non-empty string.
   */
  @IsOptional()
  @IsString()
  firstName?: string;

  /**
   * The user's email address.
   * Must be a valid email format.
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * A list of user's permissions
   * @example ['read_users']
   */
  @IsArray()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];

  /**
   * A list of user's roles
   * @example ['admin', 'user']
   */
  @IsArray()
  @IsEnum(Role, { each: true })
  roles: Role[];
}
