import { IsArray, IsEnum } from 'class-validator';

import { Pagination } from '@/common/dtos/pagination.dto';
import { Permission } from '@/common/enums/permission.enum';
import { Role } from '@/common/enums/role.enum';

/**
 * Represents query parameters for paginated tasklist requests,
 * including pagination settings and filtering conditions.
 */
export class UserQueryFilter extends Pagination {
  /**
   * A list of user's permissions
   * @example ['read_users']
   */
  @IsArray()
  @IsEnum(Permission, { each: true })
  permissions: Permission[] = [Permission.READ];

  /**
   * A list of user's roles
   * @example ['admin', 'user']
   */
  @IsArray()
  @IsEnum(Role, { each: true })
  roles: Role[] = [Role.USER];
}
