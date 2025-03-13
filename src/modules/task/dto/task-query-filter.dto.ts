import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

import { Pagination } from '@/common/dtos/pagination.dto';
import { TaskStatus } from '@/common/enums/task-status.enum';

/**
 * Represents query parameters for paginated tasklist requests,
 * including pagination settings and filtering conditions.
 */
export class TaskQueryFilter extends Pagination {
  @IsUUID()
  @IsNotEmpty()
  targetId: string;

  /**
   * The due date for the task.
   * Must be a valid Date object.
   */
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  /**
   * The status of the task, represented as an enum.
   * Defaults to `PENDING`.
   */
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
