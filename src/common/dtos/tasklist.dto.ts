import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) for  task list object.
 * Ensures that the task list name meets validation requirements.
 */
export class TasklistDto {
  /**
   * Unique identifier for the entity, generated as a UUID.
   * Must be a valid UUID.
   */
  @IsNotEmpty()
  @IsUUID()
  id: string;

  /**
   * The name of the task list.
   * Must be a non-empty string with a minimum length of 4 characters.
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;
}
