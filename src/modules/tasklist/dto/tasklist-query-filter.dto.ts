import { IsOptional, IsUUID } from 'class-validator';

import { Pagination } from '@/common/dtos/pagination.dto';

/**
 * Represents query parameters for paginated tasklist requests,
 * including pagination settings and filtering conditions.
 */
export class TasklistQueryFilter extends Pagination {
  @IsUUID()
  @IsOptional()
  targetId?: string;
}
