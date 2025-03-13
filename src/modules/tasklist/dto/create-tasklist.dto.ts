import { TasklistDto } from '@/common/dtos/tasklist.dto';
import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new task list.
 * Ensures that the task list name meets validation requirements.
 */
export class CreateTasklistDto extends OmitType(TasklistDto, ['id'] as const) {
  /**
   * Unique identifier for the user whom the task list belongs to.
   * Must be a valid UUID.
   */
  @IsUUID()
  @IsOptional()
  targetId?: string;
}
