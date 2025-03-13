import { PartialType } from '@nestjs/swagger';
import { CreateTasklistDto } from './create-tasklist.dto';

/**
 * Data Transfer Object (DTO) for updating a task list.
 * Inherits from `CreateTaskListDto` but makes all fields optional.
 */
export class UpdateTasklistDto extends PartialType(CreateTasklistDto) {}
