import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

/**
 * Data Transfer Object (DTO) task object
 * Ensures that all required fields are properly validated.
 */
export class TaskDto {
  /**
   * Unique identifier for the entity, generated as a UUID.
   * Must be a valid UUID.
   */
  @IsNotEmpty()
  @IsUUID()
  id: string;

  /**
   * The ID of the tasklist to which this task belongs.
   * Must be a valid UUID.
   */
  @IsNotEmpty()
  @IsUUID()
  targetId: string;

  /**
   * The title of the task.
   * Must be a non-empty string.
   */
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * A short description of the task.
   * Must be a non-empty string.
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * A more detailed description of the task (optional).
   * If provided, it must be a string.
   */
  @IsOptional()
  @IsString()
  fullDescription?: string;

  /**
   * The due date for the task.
   * Must be a valid Date object.
   */
  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  /**
   * The status of the task, represented as an enum.
   * Defaults to `PENDING`.
   */
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus = TaskStatus.PENDING;

  /**
   * The priority of the task.
   * Must be an integer between 1 and 5.
   * Defaults to 3.
   */
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Max(5)
  priority?: number = 1;
}
